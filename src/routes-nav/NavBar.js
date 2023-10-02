import React from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../UserContext";

//This file handles navigation bar for the app 

const NavBar = ({logout}) => {
    const { currentUser } = UserContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/companies">
                  Companies
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/jobs">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Log out {currentUser.first_name || currentUser.username}
                </Link>
              </li>
            </ul>
          );
    }

    function loggedOutNav(){
        return (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          );
    }

    return (
        <nav className="NavBar navbar navbar-expand-md mb-5">
          <Link className="navbar-brand" to="/">
            Jobly
          </Link>
          {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
      );

};

export default NavBar;