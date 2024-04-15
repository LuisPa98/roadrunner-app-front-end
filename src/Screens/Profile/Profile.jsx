import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../Services/profile.js";
import { userRuns } from "../../Services/run.js";
import Map from "../../Components/Map/Map.jsx";
import ProfileComponent from "../../Components/Profile/Profile.jsx";
import "./profile.css";

function Profile({ profile, myProfile, user }) {
  const [Runs, setRuns] = useState([]);
  const [viewedProfile, setViewedProfile] = useState({});
  const [runsToggle, setRunsToggle] = useState(false);
  const [key, setKey] = useState(0);
  const [toggle, setToggle] = useState(0)


  const { profileId } = useParams();

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    fetchUserRuns();
  }, [runsToggle]);

    //Will rerender state when comment is added to render the correct comment length
    useEffect(() => {
      fetchUserRuns()
    },[toggle])

  const getUserProfile = async () => {
    const response = await getUser(profileId);
    console.log(response);
    setViewedProfile(response);
  };

  const fetchUserRuns = async () => {
    const feedRunData = await userRuns(profileId);
    setRuns(feedRunData);
  };

  return (
    <div key={key} className="profileContainer">
      <ProfileComponent profile={profile} />
      <div className="profileRunLengthContainer">
        <h2>Total Runs</h2> 
        <span className='runLength'> {Runs.length}</span>
      </div>
      {Runs.map((Run) => (
        <Map
          className="userRuns"
          Run={Run}
          user={user}
          setKey={setKey}
          setToggle={setToggle}
          runsToggle={runsToggle}
          setRunsToggle={setRunsToggle}
          myProfile={myProfile}
          key={Run.id}
        />
      ))}
    </div>
  );
}

export default Profile;
