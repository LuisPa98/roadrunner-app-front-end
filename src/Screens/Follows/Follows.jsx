import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFollowers, getFollowing } from "../../Services/follow.js";
import Profile from "../../Components/Profile/Profile.jsx";
import DisplayUser from "../../Components/SearchUser/searchUser.jsx";
import "./follows.css";

function Follows({ profile }) {
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
    };
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
    setShowFollowers(true);
  };
  //sets both values false

  // const handleExitList = () => {
  //   setShowFollowing(false); // hides following list on exit
  //   setShowFollowers(false); // hides followers list on exit
  // };

  return (
    <div className="followScreenContainer">
      <Profile profile={profile} />
      <div className="followScreenButtonsContainer">
        <button className="followScreenButtons" onClick={handleShowFollowing}>
          Following
        </button>
        <button className="followScreenButtons" onClick={handleShowFollower}>
          Followers
        </button>
      </div>
      {/* shows following or followers list, and has a exit button like instagram when showing either list
      {(showFollowing || showFollowers) && (
        <button className="exitFollowListBtn" onClick={handleExitList}>
          Exit
        </button>
      )} */}
      <div className="followList">
        {showFollowing ? (
          following.map((following) => (
            <Link to={`/profile/${following.user}/`} key={following.user}>
              <div className="displayUserProfileContainer">
                <DisplayUser
                  picture={following.picture}
                  username={following.username}
                  className="displayLinkToUserProfile"
                />
              </div>
            </Link>
          ))
        ) : showFollowers ? (
          followers.map((follower) => (
            <Link
              to={`/profile/${follower.user}/`}
              key={follower.user}
              className="displayLinkToUserProfile"
            >
              <div className="displayUserProfileContainer">
                <DisplayUser
                  picture={follower.picture}
                  username={follower.username}
                />
              </div>
            </Link>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Follows;
