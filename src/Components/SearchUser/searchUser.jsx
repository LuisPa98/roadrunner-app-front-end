import React from "react";

function SearchUser({ picture, username }) {
  return (
    <div>
      <img className="searchUserProfilePicture" src={picture} alt="Profile" />
      <p className="searchUserProfileUsername">{username}</p>
    </div>
  );
}

export default SearchUser;
