import {useState, useEffect} from "react";
import { verifyUser } from "../../Services/users.js";
import { useNavigate, NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  
  let navigate = useNavigate()

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

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
      <div className="headerLogo">Logo</div>
      <div className="headerBtn">
        <NavLink className="headerLogoutBtn" to="/sign-out">
          Log Out
        </NavLink>
        <button 
        className="headerProfileBtn"
        onClick={() => {navigate(`/profile/${user.id}/`);}}
        >Profile</button>
      </div>
    </div>
  );
}

export default Header;
