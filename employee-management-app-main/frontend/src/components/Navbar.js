import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

const NavBar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [haveAdminRole, setHaveAdminRole] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setHaveAdminRole(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        Employee Management App
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}

        {haveAdminRole && (
          <li className="nav-item">
            <Link to={"/employee"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}

        {haveAdminRole && (
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Employee
            </Link>
          </li>
        )}

        {/* {currentUser && (
          <li className="nav-item">
            <Link to={"/employee/" + currentUser.id} className="nav-link">
              Employee Details
            </Link>
          </li>
        )} */}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default NavBar;