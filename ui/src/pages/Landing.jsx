import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/landing.scss"
import { AuthContext } from '../authContext'

const Landing = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate('/home');
      }
    }
  }, [user, navigate]);

  return (
    <div className="">
      {
        user ? null : (
          <div className='landing'>
            <div className="text">
              <p>Welcome to <span>DineIn</span> !</p>
              <Link to="/adminLogin">
                <button>Login as Admin</button>
              </Link>
              <Link to="/userLogin">
                <button>Login as User</button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Landing;