import { useState, useEffect } from "react";
import Map from "../../Components/Map/Map.jsx"
import { getFeedRuns } from "../../Services/run.js"
import { addComment, listComment } from "../../Services/comment.js"
import "./feed.css";

function Feed() {
  const [ Runs, setRuns] = useState([])
  const [ comments, setComments ] = useState([])
  const [ likes, setLikes ] = useState([])

  

  const fetchFeedRuns = async () => {
    const feedRunData = await getFeedRuns()
    setRuns(feedRunData)
  }


  useEffect(() => {
    fetchFeedRuns()
  }, [])
  
  console.log(Runs)
  return (
  <div>
    <h3>Feed</h3>
    {
      Runs.map((Run) => (
        <Map className="feedRuns" Run={Run} key={Run.id}/>
      ))
    }
  </div>
  );
}

export default Feed;
