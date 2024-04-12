import React from "react";
import { feedRuns } from "../../Services";
import "./map.css";

function Map() {

  return (
  <div className="mapComponentContainer">
    <div className="mapComponentContainerInfo">
      <h3 className="mapComponentContainerName"></h3>
      <p className="mapComponentContainerDate"></p>
    </div>
    <div className="mapComponentContainerRunStats">
      
    </div>
    <div className="mapComponentContainerImage">

    </div>
  </div>
  );

}

export default Map;
