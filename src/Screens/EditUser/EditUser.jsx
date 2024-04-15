import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, deleteUser } from "../../Services/profile.js";
import "./editUser.css";

function EditUser({ profile }) {
  const navigate = useNavigate();
  
  //sets up State for editable user fields
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });

  //sets up each input to receive updated State
  const handleChange = (event) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  //sends api call with updated user fields on submit
  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      await editUser(profile.user, {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        username: updatedUser.username,
      });
      navigate(`/profile/${profile.user}`);
    } catch (error) {
      console.error(error);
      setUpdatedUser({
        first_name: "",
        last_name: "",
        username: "",
      });
    }
  };

  return (
    <div className="editUserContainer">
      <div className="editUserFormContainer">
        <form onSubmit={handleEditUser} className="editUserForm">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={updatedUser.first_name}
            onChange={handleChange}
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={updatedUser.last_name}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
          />
          <button type="Submit">Edit</button>
          <button>Delete</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;

// def perform_destroy(self, instance):
//   user = instance.user
//   instance.delete()
//   user.delete()
