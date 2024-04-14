import {useState, useEffect} from "react";
import { verifyUser } from "../../Services/users.js";
import { useNavigate } from "react-router-dom";
import "./navBar.css";

function NavBar() {
  // using useNavigate to go to the correct screen when clicking the buttons
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [orangeHome, setOrangeHome] = useState(true);
  const [orangeSearch, setOrangeSearch] = useState(false);
  const [orangeRun, setOrangeRun] = useState(false)
  const [orangeProfile, setOrangeProfile] = useState(false)

  const homeStyle = orangeHome
    ? "navBarBtns navBarHome orangeHome"
    : "navBarBtns navBarHome";
    const searchStyle = orangeSearch
    ? "navBarBtns navBarSearch orangeSearch"
    : "navBarBtns navBarSearch";
    const runStyle = orangeRun
    ? "navBarBtns navBarRun orangeRun"
    : "navBarBtns navBarRun";
    const profileStyle = orangeProfile
    ? "navBarBtns navBarProfile orangeProfile"
    : "navBarBtns navBarProfile";


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await verifyUser();
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
  return( 
  <div className="navBar">
    <button 
      onClick={() => {
        setOrangeHome(true)
        setOrangeSearch(false)
        setOrangeRun(false)
        setOrangeProfile(false)
        navigate("/feed");
      } } 
      className={homeStyle}
    ></button>
    <button 
      onClick={() => {
        setOrangeHome(false)
        setOrangeSearch(true)
        setOrangeRun(false)
        setOrangeProfile(false)
        navigate("/search")}} 
      className={searchStyle}
    ></button>
    <button 
    onClick={() => {
      setOrangeHome(false)
      setOrangeSearch(false)
      setOrangeRun(true)
      setOrangeProfile(false)
      navigate("/run")}}
    className={runStyle}
    ></button>
    <button 
    onClick={() =>{
      setOrangeHome(false)
      setOrangeSearch(false)
      setOrangeRun(false)
      setOrangeProfile(true) 
      navigate(`/profile/${user.id}/`)}} 
    className={profileStyle}
    ></button>
  </div>
  );
}

export default NavBar;
