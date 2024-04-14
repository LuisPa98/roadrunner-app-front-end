import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFollowers, getFollowing } from "../../Services/follow.js";
import Profile from "../../Components/Profile/Profile.jsx";
import "./follows.css";

function Follows({profile}) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false); 

  // will add Profileid when accessing this Route
  const { profileId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        // fetch following data
    const followingData = await getFollowing(profileId);
    setFollowing(followingData);
        
        // fetch follower data
    const followerData = await getFollowers(profileId);
    setFollowers(followerData);
    }
    fetchData();
    
  }, []);

  const handleShowFollowing = async () => {
    //toggles showing following
    setShowFollowing(true);
    //toggles showing followers
    setShowFollowers(false);
  };

  const handleShowFollower = async () => {
    //toggles showing following
    setShowFollowing(false);
    //toggles showing following
    setShowFollowers(true)
  };
  //sets both values false 


  const handleExitList = () => {
    setShowFollowing(false); // hides following list on exit 
    setShowFollowers(false); // hides followers list on exit
  };


  return (
    <div className="followScreenContainer">
      <Profile profile={profile} />
      <h1>follows</h1>
      <button
        className="followScreenFollowingBtn"
        onClick={handleShowFollowing}
      >
        Following
      </button>
      <p>{following.length}</p>
      <button
        className="followScreenFollowerBtn"
        onClick={handleShowFollower}
      >
        Followers
      </button>
      <p>{followers.length}</p>
      {/* shows following or followers list, and has a exit button like instagram when showing either list */}
      {(showFollowing || showFollowers) && (
        <button className="exitFollowListBtn" onClick={handleExitList}>
          Exit
        </button>
      )}
      <div className="followList">
        <ul>
          {showFollowing
            ? following.map((following) => (
                <li key={following.user}>
                  <Link to={`/profile/${following.user}/`}>{following.username}</Link>
                </li>
              ))
            : showFollowers      
            ? followers.map((follower) => (
                <li key={follower.user}>
                  <Link to={`/profile/${follower.user}/`}>{follower.username}</Link>
                </li>
              ))
            : <div></div>}
        </ul>
      </div>
    </div>
  );
}

export default Follows;