// client/src/components/Navbar.jsx

import '../styles/navbar.scss'
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"


const Navbar = ({type}) => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }
    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>DineIn</p>
            </Link>
            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar"><FontAwesomeIcon icon={faBars} className="icon" /></label>
            <nav className='navbar'>
                <ul>
                    {!user && <Link to="/landing">
                        <li><p>Landing</p></li>
                    </Link>}
                    {user && !user.isAdmin && <Link to="/user/home">
                        <li><p>Search Page</p></li>
                    </Link>}
                    {user && user.isAdmin && <Link to={`/admin/restaurant/${user.rest}`}>
                        <li><p>Restaurant</p></li>
                    </Link>}
                    {user && user.isAdmin && <Link to="/admin/reservations">
                        <li><p>Reservations</p></li>
                    </Link>}
                    {user && !user.isAdmin && <Link to="/user/reservations">
                        <li><p>Reservations</p></li>
                    </Link>}
                    {user ? (<>

                            <li onClick={handleClick} style={{ cursor: "pointer" }}><p>Logout</p></li>
                            <li><div className="profilePicture">
                                <img src={user.profilePicture || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" />
                            </div></li>
                            <li id="usernamename"><p>{user.username}</p></li>
                    </>
                    )
                        :
                        (
                            <>
                                <Link to={type === "admin"? "/adminRegister":"/userRegister"}>
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to={type === "user"? "/userLogin" : "/adminLogin"}>
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div >
    )
}

export default Navbar