import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import { userRuns } from '../../Services/run.js';
import Map from "../../Components/Map/Map.jsx"
import ProfileComponent from "../../Components/Profile/Profile.jsx";
import "./profile.css";


function Profile({ profile, myProfile }) {

  const [Runs, setRuns] = useState([])
  const [viewedProfile, setViewedProfile] = useState({})
  const [ runsToggle, setRunsToggle ] = useState(false)

  const { profileId } = useParams()
  
  useEffect(() => {
    getUserProfile()
  },[])

  useEffect(() => {
    fetchUserRuns()
  }, [runsToggle])

  const getUserProfile = async() => {
    const response = await getUser(profileId)
    console.log(response)
    setViewedProfile(response)
  }

  const fetchUserRuns = async () => {
    const feedRunData = await userRuns(profileId)
    setRuns(feedRunData)
  }

  return (
    <div>
      <ProfileComponent profile={profile} />
      <h1>I am profile page</h1>
      {
      Runs.map((Run) => (
        <Map className="userRuns" Run={Run} runsToggle={runsToggle} setRunsToggle={setRunsToggle} myProfile={myProfile} key={Run.id}/>
      ))
    }
    </div>
  ) 
}

export default Profile;
