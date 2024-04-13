import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../Services/like.js";
import { addComment } from "../../Services/comment.js";
import Comment from "../Comment/Comment.jsx";
import Modal from "react-modal";
import "./map.css";
import { listComment } from "../../Services/comment.js";
import { getUser } from "../../Services/profile.js";

const appElement = document.getElementById("root");
Modal.setAppElement(appElement);

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px", // Width set to 800px
    height: "550px", // Height set to 800px
    overflow: "auto", // Enables scrolling within the modal content
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Modal overlay color
  },
};

// function Map({Run, user, setKey}) {

function Map({ Run, setRunsToggle, runsToggle, myProfile, setKey, user }) {
  const [convertedTime, SetConvertedTime] = useState("");
  const [pace, setPace] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);
  const [unlike, setUnlike] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [comments, setComments] = useState([]);

  const fetchUserDetails = async () => {
    const updatedComments = await Promise.all(
      comments.map(async (comment) => {
        const profile = await getUser(comment.profile);
        console.log(profile);
        // Ensure your getUser function returns both username and picture
        return {
          ...comment,
          username: profile.username,
          picture: profile.picture,
        };
      })
    );
    setComments(updatedComments);
  };

  useEffect(() => {
    fetchComments();
  }, [Run.id]);

  const fetchComments = async () => {
    const response = await listComment(Run.id);
    setComments(response);
  };

  let profilePic =
    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

  // Automatically convert time on initial load or when Run.timetotal changes
  useEffect(() => {
    if (Run.timetotal) {
      formatTime(Run.timetotal);
      calculatePace(Run.distance, Run.timetotal);
    }
  }, [Run.timetotal, Run.distance]); // Adding Run.timetotal as a dependency ensures formatTime runs when timetotal changes

  useEffect(() => {
    // checks if the current user has already liked the run on profile  being passed as a prop by the app.jsx
    setIsLiked(Run.likes.some((like) => like === myProfile?.user));
  }, [myProfile?.user]); //  rerenders when these changes ?

  const handleLike = async () => {
    try {
      // checks if its notliked based on the prop Runid being based down from app.jsx
      if (!isLiked) {
        await addLike(Run.id);
        // changes runsToggle (which is part of dependency array of Runs useEffect) to refresh runs
        setRunsToggle((prev) => !prev);
      } else {
        await removeLike(Run.id);
        // changes runsToggle (which is part of dependency array of Runs useEffect) to refresh runs
        setRunsToggle((prev) => !prev);
      }
      // changes UI when its not liked
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  //MODAL
  function openModal() {
    fetchUserDetails();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // // Function to convert time to "minutes:seconds"
  const formatTime = (timetotal) => {
    const seconds = Math.floor(timetotal / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const time = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    SetConvertedTime(time);
  };

  // Function to calculate pace
  const calculatePace = (distance, timetotal) => {
    const totalSeconds = timetotal / 1000;
    const paceInSecondsPerKilometer = totalSeconds / distance;
    const paceMinutes = Math.floor(paceInSecondsPerKilometer / 60);
    const paceSeconds = Math.floor(paceInSecondsPerKilometer % 60);
    setPace(
      `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")} min / km`
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const commentContent = event.target.content.value;
    try {
      const response = await addComment(Run.id, commentContent, user.id);
      console.log("Comment Added:", response);
      // event.target.content.value = '';  // Clear the textarea after submitting
      setKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding comment:", error.response.data);
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div>
      <div className="mapComponentContainer">
        <Link
          to={`/profile/${Run.profile.user}/`}
          className="mapComponentContainerName"
        >
          <img className="mapComponentContainerProfilePic" src={profilePic} />
          {Run.profile.username}
        </Link>
        <p className="mapComponentContainerDate">{Run.date}</p>
        <div className="mapComponentContainerRunStats">
          <p className="mapComponentContainerDistance">
            Distance:{Run.distance.toFixed(2)}Km
          </p>
          <p className="mapComponentContainerTime">Time:{convertedTime}</p>
          <p className="mapComponentContainerPace">Pace:{pace}</p>
        </div>
        <div className="mapComponentContainerImage">
          <img src={Run.path} className="mapComponentContainerImage" />
        </div>
        <div className="mapComponentContainerCommentsLikes">
          {isLiked ? (
            <button className="mapComponentContainerLikes" onClick={handleLike}>
              Unlike {Run.likes.length}
            </button>
          ) : (
            <button className="mapComponentContainerLikes" onClick={handleLike}>
              Likes {Run.likes.length}
            </button>
          )}
          <button className="mapComponentContainerComments" onClick={() => openModal(true)}>
            Comment {Run.comments.length}
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Comment
          run={Run}
          comments={comments}
          fetchUserDetails={fetchUserDetails}
        />
        <form onSubmit={onSubmit}>
          <textarea name="content" rows={4} cols={40} />
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Map;
