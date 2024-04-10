import React from "react";
import Header from "../Header/Header.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import "./layout.css";

function Layout(props) {
  return (
    <div>
      <div id="layoutBodyContainer">
        <Header />
        <div id="layoutBody">{props.children}</div>
      </div>
      <NavBar />
    </div>
  );
}

export default Layout;
