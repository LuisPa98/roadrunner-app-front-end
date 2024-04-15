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
  const [isFollowed, setIsFollowed] = useState(false);

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
  }, []);

  // useEffect(() => {
  //   // checks if the current user has already liked the run on profile  being passed as a prop by the app.jsx
  //   setIsFollowed(Run.likes.some((like) => like === profile?.user));
  // }, [profile?.user]); //  rerenders when these changes ?

  const handleCreateFollow = async (profile, profileId) => {
    try {
      await createFollow(profile.user, profileId);
      const followerData = await getFollowers(profileId);
      setFollowers(followerData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFollow = async (profile, profileId) => {
    try {
      await deleteFollow(profile.user, profileId);
      const followerData = await getFollowers(profileId);
      setFollowers(followerData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(viewingProfile);
  console.log(profile);

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
        {profile && followers.includes(profile.user === profileId) ? (
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
