import React from 'react'
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/card.scss"
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div>
      <Link to={`/restaurant/${props._id}`}>
        <div className='cardContainer'>
          <div className="picContainer">
            <img src={props.photo} alt="" />
          </div>
          <div className="detailsContainer">
            <h2>{props.name}</h2>
            <h3>{props.location.substring(0, 50)}...</h3>
            <div className="star-rating-slider">
              Rating: 
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                  key={star}
                  icon={star <= props.rating ? solidStar : regularStar}
                  className={"star-icon"}
                  />
                  ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card;