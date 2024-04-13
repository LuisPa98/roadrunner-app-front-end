import { useState, useEffect } from "react";
import Map from "../../Components/Map/Map.jsx";
import { getFeedRuns } from "../../Services/run.js";
import { addComment, listComment } from "../../Services/comment.js";
import "./feed.css";

function Feed({ profile, user }) {
  const [Runs, setRuns] = useState([]);
  const [comments, setComments] = useState([]);
  const [runsToggle, setRunsToggle] = useState(false);
  const [key, setKey] = useState(0);

  // function Feed({user}) {
  //   const [ Runs, setRuns] = useState([])
  //   // const [ comments, setComments ] = useState([])
  //   const [ likes, setLikes ] = useState([])
  //   const [key, setKey] = useState(0)

  const fetchFeedRuns = async () => {
    const feedRunData = await getFeedRuns();
    setRuns(feedRunData);
  };

  useEffect(() => {
    fetchFeedRuns();
  }, [runsToggle]);

  return (
    <div key={key} className="feedContainer">
      <h3>Feed</h3>
      {Runs.map((Run) => (
        <Map
          className="feedRuns"
          user={user}
          Run={Run}
          setKey={setKey}
          setRunsToggle={setRunsToggle}
          myProfile={profile}
          key={Run.id}
        />
      ))}
    </div>
  );
}

export default Feed;
