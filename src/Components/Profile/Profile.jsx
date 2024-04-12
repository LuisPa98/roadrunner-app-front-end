import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const { profileId } = useParams();

  //sets the state of the user profile from link navigation
  const [profile, setProfile] = useState({});

  //calls user profile 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileDetails = getUser(profileId);
        setProfile(profileDetails);
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    };

    fetchProfile();
  }, []);

  console.log(profile);

  return (
    <div className="profileComponentContainer">
      <img src=""  />
      {/* {...navigate("/update-account")} */}
      {/* Add ternary above to confirm profile user matches logged in user before allowing edit functionality */}
      <h1></h1>
      <h2 className="profileComponentSubheadings">Following</h2>
      <p></p>
      <h2 className="profileComponentSubheadings">Followers</h2>
      <p></p>
      <button>Follow</button>
    </div>
  );
}

export default Profile;
