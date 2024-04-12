import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header({ user, profile }) {
  let navigate = useNavigate()

  return( 
    <div className="header">
      <div className="headerLogo">Logo</div>
      <button 
      className="headerProfileBtn"
      onClick={() => {navigate("/profile");}}
      >Profile</button>
    </div>
  );
}

export default Header;
