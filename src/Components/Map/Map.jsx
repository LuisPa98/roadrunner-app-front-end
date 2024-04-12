import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { addLike, removeLike } from "../../Services/like.js"
import "./map.css";

function Map({Run}) {
  const [like, setLike] = useState([])
  const [unlike, setUnlike] = useState([])
  console.log(Run.id)
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


  return (
  <div className="mapComponentContainer">
    <div className="mapComponentContainerInfo">
      <Link to={`/profile/${Run.profile.user}/`}className="mapComponentContainerName">{Run.profile.username}</Link>
      <p className="mapComponentContainerDate">{Run.date}</p>
    </div>
    <div className="mapComponentContainerRunStats">
      <p className="mapComponentContainerDistance">Distance:{Run.distance}</p>
      <p className="mapComponentContainerTime">Time:{Run.timetotal}</p>  {/* needs to be converted */}
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
