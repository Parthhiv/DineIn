import React, { useContext, useState } from "react";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../components/Navbar'
import axios from "axios";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import { slots } from "../data";
import "../styles/adminLanding.scss"

const AdminLanding = () => {

  const [info, setInfo] = useState({});
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
      const newpost = {
        ...info,
        admin: user._id,
        rating: rating,
        slots: slots
      }

      try {
        const res = await axios.post("http://localhost:7700/restaurants", newpost)
        console.log(res)
        navigate(`/admin/restaurant/${res.data._id}`);
      } catch (err) {
        console.log(err);
      }
    
  };

  return (
    <div className="createRestContainer">
        <Navbar />
        <div className="cpContainer">
        <div className="formContainer">

          <div className="inputContainer">

                <div className="input">
                  <label htmlFor="title">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="input">
                  <label htmlFor="location">Location</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="location"
                    placeholder="Enter location"
                  />
                </div>

                <div className="input">
                  <label htmlFor="location">Add Picture</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="photo"
                    placeholder="Enter url of restaurant Picture"
                  />
                </div>

                <div className="input">
                  <label htmlFor="price">Price Range</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="price"
                    placeholder="Enter price range"
                  />
                </div>

                <div className="input">
                  <label htmlFor="date">Contact Information</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="contact"
                    placeholder="Enter the information"
                  />
                </div>

                <div className="input">
                  <div className="star-rating-slider">
                    Rating: 
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={star <= rating ? solidStar : regularStar}
                        className={"star-icon"}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>

            <div className="input">
              <label htmlFor="desc">Description</label>
              <input
                onChange={handleChange}
                type="text"
                id="description"
                placeholder="A brief description"
              />
            </div>

            <button className="button" onClick={handleClick} type="submit">
              Create Restaurant
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLanding;