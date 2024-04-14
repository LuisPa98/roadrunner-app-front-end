import { CgProfile } from "react-icons/cg";
import "./searchUser.css";

function SearchUser({ picture, username }) {
  return (
    <div className="searchUserContainer">
      {/* <img className="searchUserProfilePicture" src={picture} alt="Profile" /> */}
      <CgProfile className="mapComponentContainerProfilePic searchUserProfilePicture" />
      <p className="searchUserProfileUsername">{username}</p>
    </div>
  );
}

export default SearchUser;
