import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { addLike, removeLike } from "../../Services/like.js"
import "./map.css";

function Map({Run}) {
  const [like, setLike] = useState([])
  const [unlike, setUnlike] = useState([])
  const [convertedTime, SetConvertedTime] = useState('')
  const [pace, setPace] = useState('');

  let profilePic = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"

  // Automatically convert time on initial load or when Run.timetotal changes
  useEffect(() => {
    if (Run.timetotal) {
      formatTime(Run.timetotal);
      calculatePace(Run.distance, Run.timetotal);
    }      

  }, [Run.timetotal, Run.distance]);  // Adding Run.timetotal as a dependency ensures formatTime runs when timetotal changes

  const handleLike = async () => {
      
    const likeRun = await addLike(Run.id)
    console.log(likeRun)
    setLike(likeRun)
    console.log(like)
  }

  const handleUnlike = async () => {

    const unlikeRun = await removeLike(Run.id)

    setUnlike(unlikeRun)
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
    <div className="mapComponentContainerInfo">
      
      <Link to={`/profile/${Run.profile.user}/`}className="mapComponentContainerName">
        <img className="mapComponentContainerProfilePic" src={profilePic}/>
        {Run.profile.username}
      </Link>
      <p className="mapComponentContainerDate">{Run.date}</p>
    </div>
    <div className="mapComponentContainerRunStats">
      <p className="mapComponentContainerDistance">Distance:{Run.distance.toFixed(2)}Km</p>
      <p className="mapComponentContainerTime">Time:{convertedTime}</p>  {/* needs to be converted */}
      <p className="mapComponentContainerPace">Pace:{pace}</p>
    </div>
    <div className="mapComponentContainerImage">
      <img src={Run.path}/>
    </div>
    <div className="mapComponentContainerCommentsLikes">
      <button 
      className="mapComponentContainerLikes"
      onClick={handleLike}
      >Likes {Run.likes.length}</button>
      <button className="mapComponentContainerComments">Comment {Run.comments.length}</button>
    </div>
  </div>
  );

}

export default Map;
