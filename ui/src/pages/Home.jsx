import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch"
import '../styles/home.scss'
import Card from '../components/Card';

const Home = () => {
  const [query, setQuery] = useState("");
    const {data, loading} = useFetch(`http://localhost:7700/restaurants`)

    const keys = ["name", "location"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key] && item[key].toLowerCase().includes(query))
      );
    };
    
  const searchedData = search(data);
  return (
    <div className='home'>
      <Navbar />
      <div className="search">
          <div className="searchBar">
              <h2>Explore</h2>
              <div className="searchInput">
                  <input
                    type="text"
                    placeholder="Search places or restaurants"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              </div>
          </div>
      </div>

      <div className="searchedPosts">
        {loading ? (
          <>
            <div className="p" style={{color: "white", "fontFamily": "'Kaushan Script', cursive"}}>Loading...</div>
          </>
        ) : (
          <>
            {searchedData.length > 0 ? (
              searchedData.map((item, i) => (
                <Card
                  key={i}
                  _id={item._id}
                  photo={item.photo}
                  name={item.name}
                  location={item.location}
                  rating={item.rating}
                />
              ))
            ) : (
              <div className="noResults" style={{
                color: "	#FF7F50",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "20px"
              }}>
                No restaurants found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home;