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
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const appElement = document.getElementById("root");
Modal.setAppElement(appElement);

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Modal overlay color
  },
};

function Map({ Run, setRunsToggle, runsToggle, myProfile, setKey, user, setToggle}) {
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
    const time = `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
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


  const date = new Date(Run.date);
  const options = {year: 'numeric', month: 'long', day: 'numeric'}
  const formattedDate = date.toLocaleDateString('en-US', options);

  const onSubmit = async (event) => {
    event.preventDefault();
    const commentContent = event.target.content.value;
    try {
      const response = await addComment(Run.id, commentContent, user.id);
      console.log("Comment Added:", response);
      // event.target.content.value = '';  // Clear the textarea after submitting
      setKey((prev) => prev + 1);
      setToggle((prev) => prev + 1)
      // Toggle to force re-render in other parts of the application
     } catch (error) {
      console.error("Error adding comment:", error.response.data);
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="tabletContainer">
      <div className="mapComponentContainer">
        <Link
          to={`/profile/${Run.profile.user}/`}
          className="mapComponentContainerName"
        >
          {/* <img className="mapComponentContainerProfilePic" src={profilePic} /> */}
          <CgProfile className="mapComponentContainerProfilePic"/>
          <span className="mapComponentContainerStat">{Run.profile.username}</span>
        </Link>
        <p className="mapComponentContainerDate"> {formattedDate}</p>

        <div className="mapComponentContainerRunStats">
          <p className="statsInfo">
            Distance: <span className="mapComponentContainerStat">{Run.distance.toFixed(2)}Km</span>
          </p>
          <span className="divider">|</span>
          <p className="statsInfo">Time: <span className="mapComponentContainerStat">{convertedTime}</span></p>
          <span className="divider">|</span>
          <p className="statsInfo">Pace: <span className="mapComponentContainerStat">{pace}</span></p>
        </div>

        <div >
          <img src={Run.path} className="mapComponentContainerImage" />
        </div>

        <div className="mapComponentContainerCommentsLikes">
          {isLiked ? (
            <button className="mapComponentContainerButton" onClick={handleLike}>
              <FaHeart color="#F1600D" size={35}/> {Run.likes.length}
            </button>
          ) : (
            <button className="mapComponentContainerButton" onClick={handleLike}>
              <FaRegHeart size={35}/> {Run.likes.length}
            </button>
          )}
          <button className="mapComponentContainerButton" onClick={() => openModal(true)}>
          <BiCommentDetail  size={35}/>  {Run.comments.length}
          </button>
        </div>
      </div>
      <div className="mapCommentContainer">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="mapModal"
        >
          <Comment
            run={Run}
            comments={comments}
          />
          <div className="mapModalForm">
            <form onSubmit={onSubmit}>
              <textarea className="mapTextArea" name="content" rows={5} cols={50} />
              <div >
                <button className="modalClose" onClick={closeModal}>Close</button>
                <button className="modalSubmit" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Modal>`
      </div>
    </div>
  );
}

export default Map;
