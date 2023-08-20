import { React, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Flash from "../components/Flash";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState();
  const [currentUser, setCurrentUser] = useState();
  const baseURL =
    process.env.NODE_ENV === "production"
      ? window.location.origin // Use the current origin in production
      : "http://localhost:3100"; // Use localhost in development
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, // to include credentials (session cookie)
    headers: { "Content-Type": "application/json" },
  });
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/register", {
        name: name,
        email: email,
        username: username,
        password: password,
      });
      if (response.data) {
        setFlashMessage(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUser = async (event) => {
    event.preventDefault();
    const response = await api.get("/api/currentUser");
    console.log(response);
    if (response.data) {
      if (response.data.user) {
        setCurrentUser(response.data.user);
      } else {
        setCurrentUser();
      }
    }
  };
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="mainPage">
      <Navbar />
      <div className="container-xxl">
        <button onClick={getCurrentUser} className="btn btn-success mt-3">
          Get Current User
        </button>
        <div className="col-md-4 offset-md-4 text-center formContainer my-5">
          {flashMessage ? (
            <Flash
              message={flashMessage}
              deleteFlashState={() => setFlashMessage()}
            />
          ) : (
            <div></div>
          )}
          <h2 className="my-4">Register</h2>
          <form onSubmit={registerUser} className="needs-validation formAuth">
            <div className="form-group mb-3">
              <label htmlFor="name" className="my-2">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                spellCheck="false"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <div className="invalid-feedback">Add your name!</div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="my-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                spellCheck="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <div className="invalid-feedback">Add email!</div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="username" className="my-2">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                spellCheck="false"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              ></input>
              <div className="invalid-feedback">Add username!</div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="my-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                spellCheck="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <div className="invalid-feedback">Add password!</div>
            </div>
            <button className="btn btn-success mt-3">Register</button>
            <div className="mt-3">
              Already have an account ? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;