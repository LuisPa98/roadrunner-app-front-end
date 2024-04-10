import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "./run.css";

const token =
  "pk.eyJ1IjoiamxvcGV6MDAwMSIsImEiOiJjbHVxNDNkdmkwd3AzMm1wYnZjbHpsNHlwIn0.MLnPlYU-ZjaYBfR1BRHMrg";

function Run() {
  mapboxgl.accessToken = token;
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const watchIdRef = useRef(null);
  const [route, setRoute] = useState([]);
  const [current, setCurrent] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const initializeMap = ({ latitude, longitude }) => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-157.8294, 21.2762],
      zoom: 15,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.flyTo({
        center: [longitude, latitude],
        essential: true,
        speed: 2,
      });
      // Add a layer for a single point
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap({ latitude, longitude });
      },
      () => {
        console.error("Unable to retrieve your location");
      }
    );
  }, []);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

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

  const handleStart = () => {
    setStart(true);
    onStartRun();
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
      const { latitude, longitude } = position.coords;
      const updatedRoute = [...route, [longitude, latitude]];
      setRoute(updatedRoute); // Update the route state

      //circe to determine where you stoped running
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

      if (mapRef.current && updatedRoute.length) {
        const lineString = turf.lineString(updatedRoute);
        mapRef.current.getSource("geojson").setData({
          type: "FeatureCollection",
          features: [lineString],
        });
        const calculatedDistance = turf.length(lineString, {
          units: "kilometers",
        });
        setDistance(calculatedDistance);
      }
    } catch (error) {
      console.error("Unable to retrieve your location", error);
      // Prompt the user for manual retry or handle using the last known location
    }
  };

  const handleStop = () => {
    setStart(false);
    onEndRun();
  };

  return (
    <div className="Stopwatch">
      <h3>You call yourself a runner?</h3>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px" }}
      ></div>
      <div>
        {!start ? (
          <div>
            <button className="stopwatch-button" onClick={() => handleStart()}>
              Prove it.
            </button>
          </div>
        ) : (
          <div>
            <h1>
              <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((time / 10) % 1000)).slice(-2)}</span>
            </h1>
            <div>Total distance: {distance.toFixed(2)} km</div>
            <button onClick={() => handleStop()}>Giving up already?</button>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setTime(0);
            setStart(false);
          }}
        >
          Do a new run.
        </button>
      </div>
    </div>
  );
}

export default Run;
