import {useState, useEffect} from "react";
import { verifyUser } from "../../Services/users.js";
import { useNavigate, NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  
  let navigate = useNavigate()

  const [orangeProfile, setOrangeProfile] = useState(false);
  const [orangeAboutUs, setOrangeAboutUs] = useState(false);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const profileStyle = orangeProfile
    ? "headerProfileBtn orangeProfile"
    : "headerProfileBtn";
    const aboutusStyle = orangeAboutUs
    ? "headerInfoBtn orangeAboutUs"
    : "headerInfoBtn";

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
    <div className="header">
      <div className="headerLogo"></div>
      <div className="headerBtn">
        <NavLink className="headerLogoutBtn" to="/sign-out">Log Out</NavLink>
        <button 
        className={aboutusStyle} 
        onClick={() => {
          setOrangeProfile(false)
          setOrangeAboutUs(true)
          navigate('/about')}}
          ></button>
      </div>
    </div>
  );
}

export default Header;
