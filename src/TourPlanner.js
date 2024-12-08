import React, { useState, useEffect, useRef } from 'react';
import Tourism_Navbar from './Tourism_Navbar';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TourPlanner.css';
import 'leaflet-routing-machine';
import axios from 'axios';

function TourPlanner() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [routeDetails, setRouteDetails] = useState([]);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [touristSpots, setTouristSpots] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);

  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  const apiKey = '6aab4be22e97612a4aa9aaac034bef27';

  // Fetch location suggestions from OpenCage API
  const fetchLocationSuggestions = async (query, isSource) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`);
      const suggestions = response.data.map(result => ({
        name: result.display_name,
        lat: result.lat,
        lng: result.lon
      }));

      if (isSource) {
        setSourceSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Fetch intermediate tourist spots from OpenWeatherMap API
  const fetchTouristSpots = async (midpoint) => {
    if (midpoint.lat && midpoint.lng) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find`, {
          params: {
            lat: midpoint.lat,
            lon: midpoint.lng,
            radius: 50000,
            type: 'tourist_attraction',
            appid: apiKey
          }
        });

        if (response.data.list && response.data.list.length > 0) {
          setTouristSpots(response.data.list);
        } else {
          setTouristSpots([]);
        }
      } catch (error) {
        console.error("Error fetching tourist spots:", error.response ? error.response.data : error.message);
      }
    }
  };

  // Generate route using OSRM API
  const generateRoute = () => {
    if (source && destination) {
      const srcCoords = sourceSuggestions.find(place => place.name === source);
      const destCoords = destinationSuggestions.find(place => place.name === destination);

      if (srcCoords && destCoords) {
        const midpoint = {
          lat: (parseFloat(srcCoords.lat) + parseFloat(destCoords.lat)) / 2,
          lng: (parseFloat(srcCoords.lng) + parseFloat(destCoords.lng)) / 2
        };

        if (routingControlRef.current) {
          routingControlRef.current.removeFrom(mapRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(srcCoords.lat, srcCoords.lng), L.latLng(destCoords.lat, destCoords.lng)],
          routeWhileDragging: true,
          addWaypoints: false,
          draggableWaypoints: false,
          createMarker: () => null
        })
        .on('routesfound', (e) => {
          const route = e.routes[0];

          const distance = (route.summary.totalDistance / 1000).toFixed(2);
          const time = (route.summary.totalTime / 60).toFixed(0);

          setTotalDistance(`${distance} km`);
          setTotalTime(`${time} minutes`);

          const newRouteDetails = route.instructions.map(instruction => ({
            direction: instruction.text,
            distance: (instruction.distance / 1000).toFixed(2) + " km"
          }));

          setRouteDetails(newRouteDetails);
          setIsRouteGenerated(true);

          fetchTouristSpots(midpoint);
        })
        .addTo(mapRef.current);
      }
    } else {
      alert("Please select both source and destination.");
    }
  };

  useEffect(() => {
    if (source) {
      fetchLocationSuggestions(source, true);
    }
  }, [source]);

  useEffect(() => {
    if (destination) {
      fetchLocationSuggestions(destination, false);
    }
  }, [destination]);

  return (
    <div className="tour-planner-container">
      <Tourism_Navbar />
      <div className="tour-planner-content">
        <center><h2>Tour Planner</h2>
        <p>Select your source and destination to generate the tour plan.</p></center>

        <div className="location-selection">
          <div className="source-destination">
            <input
              type="text"
              placeholder="Type Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="location-input"
            />
            {sourceSuggestions.length > 0 && (
              <div className="suggestions">
                {sourceSuggestions.map((place, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSource(place.name);
                      setSourceSuggestions([]);
                    }}
                    className="suggestion-item"
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Type Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="location-input"
            />
            {destinationSuggestions.length > 0 && (
              <div className="suggestions">
                {destinationSuggestions.map((place, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setDestination(place.name);
                      setDestinationSuggestions([]);
                    }}
                    className="suggestion-item"
                  >
                    {place.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={generateRoute} className="generate-plan-btn">
            Generate Plan
          </button>
        </div>

        <div className="map-container">
          <MapContainer center={[13.0827, 80.2707]} zoom={6} style={{ height: "500px", width: "100%" }} ref={mapRef}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>

        <div className="cards-container">
          {totalDistance && totalTime && (
            <div className="card route-statistics">
              <h4>Route Statistics</h4>
              <p><strong>Total Distance:</strong> {totalDistance}</p>
              <p><strong>Estimated Time:</strong> {totalTime}</p>
            </div>
          )}

          {touristSpots.length > 0 && (
            <div className="card tourist-spots">
              <h4>Intermediate Tourist Spots</h4>
              <ul>
                {touristSpots.map((spot, index) => (
                  <li key={index}>
                    <strong>{spot.name}</strong> - {spot.sys.country}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isRouteGenerated && (
            <div className="card route-card">
              <h4>Route Directions</h4>
              <button
                onClick={() => setShowDirections(!showDirections)}
                className="toggle-directions-btn"
              >
                {showDirections ? "Hide Directions" : "Show Directions"}
              </button>
              {showDirections && (
                <ul>
                  {routeDetails.map((step, index) => (
                    <li key={index}>
                      <strong>Step {index + 1}:</strong> {step.direction} - <span>{step.distance}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourPlanner;
