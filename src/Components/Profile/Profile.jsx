import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
} from "../../Services/follow.js";
import "./profile.css";

function Profile({ profile }) {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

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
      <img src="{profileDetails.picture}" />
      {profile && profileId === profile.user  && (<button
        onClick={(event) => {
          navigate("/update-account");
        }}
        className="profileComponentEdit"
      ></button>
)}
      <h1></h1>
      <h2 className="profileComponentSubheadings">Following</h2>
      <p>{following.length}</p>
      <h2 className="profileComponentSubheadings">Followers</h2>
      <p>{followers.length}</p>
      {profile && followers.includes(profile.user === profileId) ?  (
        <button onClick={() => handleCreateFollow(profile, profileId)}>
          Follow
        </button>
      ):
       (<button onClick={() => handleDeleteFollow(profile, profileId)}>
          Unfollow
        </button>
      )}
    </div>
  );
}

export default Profile;
