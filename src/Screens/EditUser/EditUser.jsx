import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, deleteUser } from "../../Services/profile.js";
import { RiCloseLine } from "react-icons/ri";
import "./editUser.css";

function EditUser({ profile }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    try {
      await deleteUser(profile.user);
      navigate("/sign-up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="editUserContainer">
      <div className="editUserFormContainer">
        <form onSubmit={handleEditUser} className="editUserForm">
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter New First Name"
            value={updatedUser.first_name}
            onChange={handleChange}
            className="editUserInput"
          />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter New Last Name"
            value={updatedUser.last_name}
            onChange={handleChange}
            className="editUserInput"
          />

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter New Username"
            value={updatedUser.username}
            onChange={handleChange}
            className="editUserInput"
          />
          <button className="editDeleteButtons" type="Submit">
            Edit Account
          </button>
          </form>
          <button
              className="editDeleteButtons"
              onClick={() => setIsOpen(true)}
            >
              Delete Account
            </button>
            {isOpen && 
            <div className="centered">
              <div className="modal">
                <div className="modalHeader">
                  <h5 className="heading">Delete Account</h5>
                </div>
                <button className="closeBtn" onClick={() => setIsOpen(false)}>
                  <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className="modalContent">
                  Are you sure you want to delete your account?
                </div>
                <div className="modalActions">
                  <div className="actionsContainer">
                    <button className="deleteBtn" onClick={handleDeleteUser}>
                      Delete
                    </button>
                    <button
                      className="cancelBtn"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>}
      </div>
    </div>
  );
}

export default EditUser;
