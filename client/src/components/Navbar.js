import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const baseURL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the current origin in production
    : "http://localhost:3100"; // Use localhost in development
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // to include credentials (session cookie)
  headers: { "Content-Type": "application/json" },
});
const Navbar = ({
  flashMessage,
  setFlashMessage,
  currentUser,
  setCurrentUser,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      const response = await api.post("/api/logout");
      if (response.data) {
        setFlashMessage(response.data);
      }
      if (response.data.flash === "success") {
        setCurrentUser(null);
        if (location.pathname == "/create") {
          navigate("/login");
        } else {
          navigate(`${location.pathname}`);
        }
      }
    } catch (error) {
      if (error.response.data) {
        setFlashMessage(error.response.data);
      }
    }
  };
  const authDisplay = () => {
    if (currentUser) {
      return (
        <>
          <Link to="/create" className="nav-link m-auto navAuth">
            <span className="me-1">
              <img src="./vote_fill.svg" alt="" />
            </span>
            <span className="spanMaterialSymbol me-3">Create</span>
          </Link>
          <Link to="/users/vote" className="nav-link m-auto navAuth">
            <span className="me-1">
              <img src="./user.svg" alt="" />
            </span>
            <span className="spanMaterialSymbol me-3">Manage</span>
          </Link>
          <button className="nav-link m-auto navAuth" onClick={handleLogout}>
            <span className="me-1">
              <img src="./logout.svg" alt="" />
            </span>
            <span className="spanMaterialSymbol me-3">Logout</span>
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="nav-link m-auto navAuth">
            <span className="me-1">
              <img src="./login.svg" alt="" />
            </span>
            <span className="spanMaterialSymbol me-3">Login</span>
          </Link>
          <Link to="/register" className="nav-link m-auto navAuth">
            <span className="me-1">
              <img src="./register.svg" alt="" />
            </span>
            <span className="spanMaterialSymbol me-3">Register</span>
          </Link>
        </>
      );
    }
  };
  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg py-3 navbar-dark sticky-top"
    >
      <div className="container-fluid">
        <Link to={"/"} className="text-decoration-none text-white">
          <div className="fw-bold  my-0 py-0">Voting Maker</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon color-light"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto"></div>
          <div className="navbar-nav ms-auto">{authDisplay()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
