import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Navbar from '../components/Navbar';
import useFetch from '../useFetch';
import {
  faMoneyBill,
  faLocationDot,
  faThumbsUp,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/restaurant.scss";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { AuthContext } from '../authContext';

const Restaurant = () => {
  const { id } = useParams(); // Retrieve id from URL
  const [date, setDate] = useState("");
  const location = useLocation();
  const { data, error, loading } = useFetch(`http://localhost:7700/restaurants/${id}`);
  const slots = useFetch(`http://localhost:7700/reservations/slots/${id}/${date}`).data;
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newRes = { ...info, author: user._id, rest: id, date: date };
    try {
      await axios.post("http://localhost:7700/reservations", newRes, {
        withCredentials: false,
      });
      navigate('/reservations');
    } catch (err) {
      console.log(err);
    }
  };

  const [viewState, setViewState] = useState({
    latitude: 17.4,
    longitude: 78.4,
    zoom: 12,
  });

  const getPlaces = useCallback(async () => {
    const promise = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${data?.location}.json?access_token=${process.env.REACT_APP_API_MAPBOX_KEY}`
    );
    const placesData = await promise.json();
    if (placesData.features.length > 0) {
      const firstPlace = placesData.features[0];
      const { center } = firstPlace;
      setViewState((prevState) => ({
        ...prevState,
        latitude: center[1],
        longitude: center[0],
      }));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getPlaces();
    }
  }, [data, getPlaces]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div class="norestaurants">No restaurants added</div>;

  return (
    <div className='restaurant'>
      <Navbar />
      <div className="rest-container">
        <div className="leftContainer">
          <h1>{data.name}</h1>
          <p>{data.description}</p>

          <div className="other-details">
            <div className="location">
              <span>
                <FontAwesomeIcon icon={faLocationDot} /> Location:
              </span>
              {data.location}
            </div>
            <div className="rating">
              <span>
                <FontAwesomeIcon icon={faThumbsUp} /> Rating:
              </span>
              {data.rating}
            </div>
            <div className="price">
              <span>
                <FontAwesomeIcon icon={faMoneyBill} /> Price Range:
              </span>
              {data.price}
            </div>
            <div className="contact">
              <span>
                <FontAwesomeIcon icon={faPhone} /> Contact:
              </span>
              {data.contact}
            </div>
          </div>

          {!user.isAdmin && (
            <div className="reservation-box">
              <div className="form-input">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  id="date"
                />
              </div>
              {date && (
                <div className="form-input">
                  <label htmlFor="slot">Time</label>
                  <select id="slot" onChange={handleChange}>
                    <option key={0} value="none">
                      -
                    </option>
                    {slots?.map((s, index) => (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-input">
                <label htmlFor="people">People</label>
                <input type="number" id="people" onChange={handleChange} />
              </div>
              <button onClick={handleClick}>Make Reservation</button>
            </div>
          )}
        </div>

        <div className="rightContainer">
          <div className="location-map">
            <Map
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              style={{ width: 400, height: 300 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={process.env.REACT_APP_API_MAPBOX_KEY}
            >
              <Marker
                className="marker"
                longitude={viewState.longitude}
                latitude={viewState.latitude}
                color="red"
              />
            </Map>
          </div>

          <div className="imgSlider">
            <div className="images">
              <img src={data.photo} height="300px" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
