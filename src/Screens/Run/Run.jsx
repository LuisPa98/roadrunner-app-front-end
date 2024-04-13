import { useEffect, useRef, useState } from "react";
import { createRun } from "../../Services/run";
import mapboxgl from "mapbox-gl";
import polyline from "@mapbox/polyline";
import * as turf from "@turf/turf";
import "./run.css";

function Run({ profile, user }) {
  mapboxgl.accessToken = process.env.REACT_APP_TOKEN;
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const watchIdRef = useRef(null);

  const [route, setRoute] = useState([]);
  const [current, setCurrent] = useState([]);

  const [startingCoordinate, setStartingCoordinate] = useState([]);

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [runEnded, setRunEnded] = useState(false);

  //Will create the map when the user selects the run option
  const initializeMap = ({ latitude, longitude }) => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-80.1301, 25.7907],
      zoom: 15,
    });

    mapRef.current = map;

    //Create a fly animation from the starting coordinates to your current coordinate
    map.on("load", () => {
      map.flyTo({
        center: [longitude, latitude],
        essential: true,
        speed: 3, //Speed at which the animation transition
      });

      // Creates a dot to signify where you currently are based on your current coordinates
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#50A5B1",
        },
      });

      // Define the source for measuring tools
      map.addSource("geojson", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add layers for measuring points and lines
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000",
        },
        filter: ["in", "$type", "Point"],
      });

      map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });
    });
  };

  //Render the get currentPosition function
  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStartingCoordinate([longitude, latitude]);
        initializeMap({ latitude, longitude });
      },
      () => {
        console.error("Unable to retrieve your location");
      }
    );
  };

  useEffect(() => {
    const clearTiming = handleSettingTimer();
    return clearTiming;
  }, [start]);

  //Responsible for setting the timer and stoping the timer.
  const handleSettingTimer = () => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  };

  const onStartRun = () => {
    console.log("start");
    setRoute([]);
    setDistance(0);
    if (mapRef.current) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPoint = [longitude, latitude];
          console.log(newPoint);
          // Update route state and immediately use the updated route to draw the line
          setRoute((currentRoute) => {
            const updatedRoute = [...currentRoute, newPoint];
            console.log(route);
            // Update the map line in real-time
            if (mapRef.current.getSource("geojson")) {
              const lineString = {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: updatedRoute,
                },
              };
              mapRef.current.getSource("geojson").setData({
                type: "FeatureCollection",
                features: [lineString],
              });

              const calculatedDistance = turf.length(lineString, {
                units: "kilometers",
              });
              setDistance(calculatedDistance);
            }

            return updatedRoute;
          });
        },
        (error) => {
          console.error("Unable to retrieve your location", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    }
  };

  const onEndRun = async () => {
    console.log("end");
    navigator.geolocation.clearWatch(watchIdRef.current);

    // Manually triggered location fetch
    const fetchCurrentLocation = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        });
      });

    try {
      const position = await fetchCurrentLocation();
      if (position) {
        const { latitude, longitude } = position.coords;
        const updatedRoute = [...route, [longitude, latitude]];
        const endingCoordinateStr = `${longitude},${latitude}`;

        // Remove duplicate coordinates
        const uniqueRoute = updatedRoute.filter(
          (coords, index, self) =>
            index ===
            self.findIndex((t) => t[0] === coords[0] && t[1] === coords[1])
        );

        setRoute(uniqueRoute); // Update the route state with unique coordinates

        // Circle to determine where you stopped running
        if (mapRef.current) {
          mapRef.current.addLayer({
            id: "end-point",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: [longitude, latitude],
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#F1600D",
            },
          });
        }

        if (mapRef.current) {
          // addEndPointToMap(mapRef.current, longitude, latitude);
          const lineString = turf.lineString(updatedRoute);
          mapRef.current.getSource("geojson").setData({
            type: "FeatureCollection",
            features: [lineString],
          });
          const calculatedDistance = turf.length(lineString, {
            units: "kilometers",
          });
          setDistance(calculatedDistance);
          console.log("this is " + distance)

          console.log("this is the route" + updatedRoute); //TEST 

          const pathRoute = polyline.fromGeoJSON({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: uniqueRoute,
            },
          });

          const path = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-a+9ed4bd(${uniqueRoute[0]}),pin-s-b+000(${endingCoordinateStr}),path-5+f44-0.5(${pathRoute})/auto/500x300?access_token=${process.env.REACT_APP_TOKEN}`;

          await createRun(profile.user, {
            distance: calculatedDistance,
            timetotal: time,
            path: path,
          });
        }
      }
    } catch (error) {
      console.error("Unable to retrieve your location", error);
    }
  };

  const handleStop = () => {
    setStart(false);
    onEndRun();
    setRunEnded(true);
  };

  const handleStart = () => {
    setStart(true);
    onStartRun();
    setRunEnded(false);
  };

  const handleAnotherRun = () => {
    // Resetting the necessary state to start another run
    setTime(0); // Reset the time
    setDistance(0); // Reset the distance
    setRoute([]); // Reset the route
    setCurrent([]); // Reset the current position if necessary
    setStart(false); // Stop the run
    setRunEnded(false); // Indicate that a new run can start
    // Remove existing map instance if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Reinitialize the map
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap({ latitude, longitude });
      },
      () => {
        console.error("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="Stopwatch">
      <h3>You call yourself a runner?</h3>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px" }}
      ></div>
      <h1>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 1000)).slice(-2)}</span>
      </h1>
      <div>Total distance: {distance.toFixed(2)} km</div>

      <div>
        {!start && !runEnded && (
          <div>
            <button className="stopwatch-button" onClick={() => handleStart()}>
              PROVE IT
            </button>
          </div>
        )}

        {/* Show stop button only if started */}
        {start && (
          <div>
            <button onClick={handleStop}>Giving up already?</button>
          </div>
        )}

        {/* Show another run button only if ended */}
        {runEnded && (
          <div>
            <button
              onClick={() => {
                handleAnotherRun();
              }}
            >
              ANOTHER RUN?
            </button>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default Run;
