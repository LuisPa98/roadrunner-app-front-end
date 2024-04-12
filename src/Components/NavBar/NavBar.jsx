import React from "react";
import { useNavigate } from "react-router-dom";
import "./navBar.css";

function NavBar() {
  // using useNavigate to go to the correct screen when clicking the buttons
  const navigate = useNavigate();
  return( 
  <div className="navBar">
    <button 
    onClick={() => {navigate("/feed");}}
    >Home</button>
    <button onClick={() => {navigate("/search")}}>Search</button>
    <button onClick={() => {navigate("/run")}}>Run</button>
  </div>
  );
}

export default NavBar;
