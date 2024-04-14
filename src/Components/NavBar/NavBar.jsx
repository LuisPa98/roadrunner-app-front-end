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
  const [orangeFollow, setOrangeFollow] = useState(false)

  const homeStyle = orangeHome
    ? "navBarBtns navBarHome orangeHome"
    : "navBarBtns navBarHome";
    const searchStyle = orangeSearch
    ? "navBarBtns navBarSearch orangeSearch"
    : "navBarBtns navBarSearch";
    const runStyle = orangeRun
    ? "navBarBtns navBarRun orangeRun"
    : "navBarBtns navBarRun";
    const followStyle = orangeFollow
    ? "navBarBtns navBarFollow orangeFollow"
    : "navBarBtns navBarFollow";


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
        setOrangeFollow(false)
        navigate("/feed");
      } } 
      className={homeStyle}
    ></button>
    <button 
      onClick={() => {
        setOrangeHome(false)
        setOrangeSearch(true)
        setOrangeRun(false)
        setOrangeFollow(false)
        navigate("/search")}} 
      className={searchStyle}
    ></button>
    <button 
    onClick={() => {
      setOrangeHome(false)
      setOrangeSearch(false)
      setOrangeRun(true)
      setOrangeFollow(false)
      navigate("/run")}}
    className={runStyle}
    ></button>
    <button 
    onClick={() =>{
      setOrangeHome(false)
      setOrangeSearch(false)
      setOrangeRun(false)
      setOrangeFollow(true) 
      navigate(`/follows/${user.id}`)}} 
    className={followStyle}
    ></button>
  </div>
  );
}

export default NavBar;
