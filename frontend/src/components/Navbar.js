import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ flashMessage, setFlashMessage }) => {
  const navigate = useNavigate();
  const baseURL =
    process.env.NODE_ENV === "production"
      ? window.location.origin // Use the current origin in production
      : "http://localhost:3100"; // Use localhost in development
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, // to include credentials (session cookie)
    headers: { "Content-Type": "application/json" },
  });
  const handleLogout = async () => {
    try {
      const response = await api.post("/api/logout");
      if (response.data) {
        setFlashMessage(response.data);
      }
      if (response.data.status === "success") {
        navigate("/vote");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg py-3 navbar-dark sticky-top"
    >
      <div className="container-fluid">
        <a className="navbar-brand my-0 py-0" href="/=">
          <img
            src="/icons/3.svg"
            alt="Logo"
            height="35px"
            className="d-inline-block align-text-center"
          ></img>
        </a>
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
          <div className="navbar-nav me-auto">
            <a className="nav-link navMenu" href="/">
              Home
            </a>
          </div>
          <div className="navbar-nav ms-auto">
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
            <button className="nav-link m-auto navAuth" onClick={handleLogout}>
              <span className="me-1">
                <img src="./logout.svg" alt="" />
              </span>
              <span className="spanMaterialSymbol me-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
