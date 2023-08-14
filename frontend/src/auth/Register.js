import { React, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Flash from "../components/Flash";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const baseURL =
    process.env.NODE_ENV === "production"
      ? window.location.origin // Use the current origin in production
      : "http://localhost:3100"; // Use localhost in development
  const api = axios.create({
    baseURL: baseURL, // Your backend URL
    // withCredentials: true, // Include credentials (session cookie)
    headers: { "Content-Type": "application/json" },
  });
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log("USER IS :::::::::::::::::::::::", response);
      if (response.data.error) {
        console.log(response.data.error);

        setFlashMessage(response.data.error.message);
      }
    } catch (error) {
      // Handle errors or set currentUser to null if the user is not authenticated
      console.log(error);
    }
  };

  return (
    <div className="mainPage">
      <Navbar />
      <div className="col-sm-4 offset-sm-4 text-center formContainer my-5">
        {flashMessage ? <Flash message={flashMessage} /> : <div></div>}
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
  );
}

export default Register;
