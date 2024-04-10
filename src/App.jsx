import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EditUser from "./Screens/EditUser/EditUser.jsx";
import Feed from "./Screens/Feed/Feed.jsx";
import Follows from "./Screens/Follows/Follows.jsx";
import LogIn from "./Screens/LogIn/LogIn.jsx";
import Profile from "./Screens/Profile/Profile.jsx";
import Run from "./Screens/Run/Run.jsx";
import Search from "./Screens/Search/Search.jsx";
import SignUp from "./Screens/SignUp/SignUp.jsx";
import Layout from "./Components/Layout/Layout.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/update-account" element={<Layout><EditUser /></Layout>} />
        <Route path="/feed" element={<Layout><Feed /></Layout>} />
        <Route path="/run" element={<Layout><Run /></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/follows" element={<Layout><Follows /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
