import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import AuthService from "../../services/auth-service";
import AuthContext from "../../context/auth-context";

const Navbar = (props) => {
  const {loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const service = new AuthService();


  // function to log user out
  const logoutUser = () => {
    service.logout().then(() => {
      // reset state value
      setLoggedInUser(null);

    });
  };

  if (loggedInUser) {
    return (
      <nav className="nav-style-loggedin">
        <span>Welcome, {loggedInUser.username}</span>
        <ul>
          <li>
            <Link to="/projects" style={{ textDecoration: "none" }}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/">
              <button onClick={logoutUser}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="nav-style">
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default Navbar;
