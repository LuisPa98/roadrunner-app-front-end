import { useState, useEffect } from "react";
import Map from "../../Components/Map/Map.jsx"
import { getFeedRuns } from "../../Services/run.js"
import { addComment, listComment } from "../../Services/comment.js"
import "./feed.css";

function Feed({ profile }) {
  const [ Runs, setRuns] = useState([])
  const [ comments, setComments ] = useState([])
  const [ runsToggle, setRunsToggle ] = useState(false)

  

  const fetchFeedRuns = async () => {
    const feedRunData = await getFeedRuns()
    setRuns(feedRunData)
  }


  useEffect(() => {
    fetchFeedRuns()
  }, [runsToggle])
  
  console.log(Runs)
  return (
  <div className="feedContainer">
    <h3>Feed</h3>
    {
      Runs.map((Run) => (
        <Map className="feedRuns" Run={Run} setRunsToggle={setRunsToggle} myProfile={profile} key={Run.id}/>
      ))
    }
  </div>
  );
}

export default Feed;
