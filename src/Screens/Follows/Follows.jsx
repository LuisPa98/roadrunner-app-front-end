import {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFollowers, getFollowing } from "../../Services/follow.js";
import "./follows.css";

function Follows() {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [toggle, setToggle] = useState(false)

  // will add Profileid when accessing this Route
  let { profileId } = useParams();

  //shows followers
  // useEffect(() => {
  //   const fetchFollowers = async () => {
  //     const followersData = await getFollowers(profileId)
  //     setFollowers(followersData)
  //   }

  //   fetchFollowers()
  // }, [])

  // //shows following
  // useEffect(() => {
  //   const fetchFollowing = async () => {
  //     const followingData = await getFollowing(profileId)
  //     setFollowing(followingData)
  //   }

  //   fetchFollowing()
  // }, [])

  const handleShowFollowing = async () => {
    const followingData = await getFollowing(profileId)
    setToggle(prev => !prev)
    setFollowing(followingData)
  }

  console.log(following)

  const handleShowFollower = async () => {
    const followerData = await getFollowers(profileId)
    setToggle(prev => !prev)
    setFollowers(followerData)
  }
  console.log(followers)


  return(
  <div>
    <h1>Followers</h1>
      <button
      className="followScreenFollowingBtn"
      onClick={handleShowFollowing}
      >Following</button>
      <button 
      className="followScreenFollowerBtn"
      onClick={handleShowFollower}
      >Follower</button>
  </div>
  );
}

export default Follows;
