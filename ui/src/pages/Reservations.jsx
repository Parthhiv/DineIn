import React, { useContext } from 'react';
import useFetch from '../useFetch';
import { AuthContext } from '../authContext';
import ReservationCard from '../components/ReservationCard';
import Navbar from '../components/Navbar';
import "../styles/reservation.scss";

const Reservations = ({ type }) => {
  const { user } = useContext(AuthContext);

  const urls = {
    admin: `http://localhost:7700/reservations/rest/${user.rest}`,
    user: `http://localhost:7700/reservations/user/${user._id}`,
  };

  // Call useFetch unconditionally
  const { data } = useFetch(urls[type]);

  return (
    <div>
      <Navbar />
      <div className="reservation-container">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <ReservationCard key={index} props={{ ...item, type }} />
          ))
        ) : (
          <h1 className="no-reservations">No Reservations Yet</h1>
        )}
      </div>
    </div>
  );
};

export default Reservations;
