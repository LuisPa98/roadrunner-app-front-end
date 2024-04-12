import {useEffect} from 'react'
import { useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import "./profile.css";

function Profile() {
  const { profileId } = useParams()
  
  useEffect(() => {
    getUserProfile()
  },[])

  const getUserProfile = async() => {
    const response = await getUser(profileId)
    console.log(response)
  }

  return (
    <div>
      <h1>I am profile page</h1>
    </div>
  ) 
}

export default Profile;
