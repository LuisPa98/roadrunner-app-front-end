import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { addLike, removeLike } from "../../Services/like.js"
import "./map.css";

function Map({Run, setRunsToggle, runsToggle, myProfile}) {
  const [convertedTime, SetConvertedTime] = useState('')
  const [pace, setPace] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  let profilePic = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"

  // Automatically convert time on initial load or when Run.timetotal changes
  useEffect(() => {
    if (Run.timetotal) {
      formatTime(Run.timetotal);
      calculatePace(Run.distance, Run.timetotal);
    }      

  }, [Run.timetotal, Run.distance]);  // Adding Run.timetotal as a dependency ensures formatTime runs when timetotal changes

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
        setRunsToggle(prev => !prev)
      } else {
        await removeLike(Run.id);
        // changes runsToggle (which is part of dependency array of Runs useEffect) to refresh runs
        setRunsToggle(prev => !prev)
      }
      // changes UI when its not liked
      setIsLiked(!isLiked)
    } catch(error) {
      console.error(error)
    }
  }

  // Function to convert time to "minutes:seconds"
  const formatTime = (timetotal) => {
    const seconds = Math.floor(timetotal / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const time = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    SetConvertedTime(time);
  };

  // Function to calculate pace
  const calculatePace = (distance, timetotal) => {
    const totalSeconds = timetotal / 1000;
    const paceInSecondsPerKilometer = totalSeconds / distance;
    const paceMinutes = Math.floor(paceInSecondsPerKilometer / 60);
    const paceSeconds = Math.floor(paceInSecondsPerKilometer % 60);
    setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} min / km`);
  };
  

  return (
  <div className="mapComponentContainer">
    <Link to={`/profile/${Run.profile.user}/`} className="mapComponentContainerName">
      <img className="mapComponentContainerProfilePic" src={profilePic}/>
      {Run.profile.username}
    </Link>
    <p className="mapComponentContainerDate">{Run.date}</p>
    <div className="mapComponentContainerRunStats">
      <p className="mapComponentContainerDistance">Distance:{Run.distance.toFixed(2)}Km</p>
      <p className="mapComponentContainerTime">Time:{convertedTime}</p>  {/* needs to be converted */}
      <p className="mapComponentContainerPace">Pace:{pace}</p>
    </div>
    <div className="mapComponentContainerImage">
      <img src={Run.path} className="mapComponentContainerImage"/>
    </div>
    <div className="mapComponentContainerCommentsLikes">
      { isLiked ?
      <button className="mapComponentContainerLikes"onClick={handleLike} >Unlike {Run.likes.length}</button>
      :
      <button className="mapComponentContainerLikes"onClick={handleLike} >Likes {Run.likes.length}</button>
      }
      <button className="mapComponentContainerComments">Comment {Run.comments.length}</button>
    </div>
  </div>
  );

}

export default Map;
