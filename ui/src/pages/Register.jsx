import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/register.scss";
import { Link } from "react-router-dom";

function Register({ type }) {
  const navigate = useNavigate();

  const urls = {
    admin: "http://localhost:7700/admin/register",
    user: "http://localhost:7700/users/register",
  };

  const logins = {
    admin: "/adminLogin",
    user: "/userLogin",
  };

  const [info, setInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('Register info:', info); // Debug log

    try {
      const response = await axios.post(urls[type], info, { withCredentials: false });
      console.log('Registration response:', response); // Debug log
      navigate(logins[type]);
    } catch (err) {
      console.error('Registration error:', err); // Debug log
    }
  };

  return (
    <div className="register">
      <Navbar type={type} />
      <div className="registerCard">
        <div className="center">
          <h1>Join us dear {type}!</h1>
          <form>
            <div className="formInput">
              <div className="txt_field">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleChange}
                  id="username"
                  required
                />
              </div>
              {type === "user" && (
                <div className="txt_field">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    id="email"
                    required
                  />
                </div>
              )}
              <div className="txt_field">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  required
                />
              </div>
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already Registered?{" "}
                <Link to={type === "admin" ? "/adminLogin" : "/userLogin"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
