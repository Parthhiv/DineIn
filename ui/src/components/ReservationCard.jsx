import React from 'react'
import "../styles/reservationCard.scss"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ReservationCard = ({props}) => {

    const handleClick = async () => {
        try{
            await axios.delete(`http://localhost:7700/reservations/${props._id}`, { withCredentials: false })
            window.location.reload();
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <div className='reservation-card'>
        <div className="details">
            <div className="res-name">
                <h1>{props.rest.name}</h1>
                {props.type === "User" && 
                    <Link to={`/restaurant/${props.rest._id}`}>
                        <button>View</button>
                    </Link>
                }
            </div>
            <div className='res-details'><p>Date: </p> <span>{props.date.substring(0, 10)}</span> <p>Time: </p> <span>{props.slot}</span> <p>People: </p> <span>{props.people}</span></div>
        </div>
        {props.type === "User" && <div className="icon">
            <FontAwesomeIcon icon={faTrash} onClick={handleClick}/>
        </div>}
    </div>
  )
}

export default ReservationCard;