import { useState, useEffect } from "react";
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
import { verifyUser } from "./Services/users.js";
import SignOut from "./Screens/SignOut/SignOut.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await verifyUser();
      console.log(userData)
      if (userData){
        setUser(userData.user)
        setProfile(userData.profile)
      } else {
        setUser(null)
        setProfile(null)
      }
    };
  
    fetchUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn setUser={setUser} setProfile={setProfile}/>} />
        <Route path="/sign-up" element={<SignUp setuser={setUser} setProfile={setProfile} />} />
        <Route path="/sign-out" element={<SignOut />}/>
        <Route path="/profile/:profileId" element={<Layout><Profile /></Layout>} />
        <Route path="/update-account" element={<Layout><EditUser /></Layout>} />
        <Route path="/feed" element={<Layout><Feed /></Layout>} />
        <Route path="/run" element={<Layout><Run profile={profile}/></Layout>} />
        <Route path="/search" element={<Layout><Search  /></Layout>} />
        <Route path="/follows/:profileId" element={<Layout><Follows /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
