import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
} from "../../Services/follow.js";
import { CgProfile } from "react-icons/cg";
import "./profile.css";

function Profile({ profile }) {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  //sets the state of the user profile from link navigation
  const [viewingProfile, setViewingProfile] = useState({});

  //calls user profile
  useEffect(() => {
    const fetchViewingProfile = async () => {
      try {
        const profileDetails = await getUser(profileId);
        // fetch following data
        const followingData = await getFollowing(profileId);
        // fetch follower data
        const followerData = await getFollowers(profileId);
        setFollowing(followingData);
        setFollowers(followerData);
        setViewingProfile(profileDetails);
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    };

    fetchViewingProfile();
  }, [profileId]);
    
  // const checkFollowerStatus = () => {
  //   const follows = followers.some((innerArray) =>
  //   Array.isArray(innerArray) && innerArray.user.includes(profile.user)
  //   );
  //   setIsFollowing(follows);
  // }

  // useEffect(() => {
  //   checkFollowerStatus();
  //   console.log(isFollowing, profile)
  // }, [followers, profile])

  const handleCreateFollow = async (profile, profileId) => {
    try {
      await createFollow(profile.user, profileId);
      const followerData = await getFollowers(profileId);
      setFollowers(followerData);
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
    return (<button className="profileFollowUnfollowButton" onClick={() => handleDeleteFollow(profile, profileId)}>
    Unfollow
  </button>)
  };

  const handleDeleteFollow = async (profile, profileId) => {
    try {
      await deleteFollow(profile.user, profileId);
      const followerData = await getFollowers(profileId);
      setFollowers(followerData);
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
    return (
      <button className="profileFollowUnfollowButton" onClick={() => handleCreateFollow(profile, profileId)}>
        Follow
      </button>
    )
  };

  return (
    <div className="profileComponentContainer">
      <div className="profileComponentLeftSide">
        <CgProfile className="profileComponentProfilePic" width="200px" />
        {profile && profileId === profile.user && (
          <button
            onClick={(event) => {
              navigate("/update-account");
            }}
            className="profileComponentEdit"
          ></button>
        )}
        <h1 className="profileComponentUsername">{viewingProfile.username}</h1>
        
      </div>
      <div className="profileComponentRightSide">
        <h2 className="profileComponentSubheadings">Following</h2>
        <a className="profileComponentCountLink" href={`/follows/${profileId}`}>{following.length}</a>
        <h2 className="profileComponentSubheadings">Followers</h2>
        <a className="profileComponentCountLink" href={`/follows/${profileId}`}>{followers.length}</a>
        {isFollowing ? (
          <button className="profileFollowUnfollowButton" onClick={() => handleDeleteFollow(profile, profileId)}>
            Unfollow
          </button>
        ) : (
          <button className="profileFollowUnfollowButton" onClick={() => handleCreateFollow(profile, profileId)}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
