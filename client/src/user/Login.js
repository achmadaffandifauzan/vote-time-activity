import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the current origin in production
    : "http://localhost:3100"; // Use localhost in development
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // to include credentials (session cookie)
  headers: { "Content-Type": "application/json" },
});
function Login({ flashMessage, setFlashMessage, currentUser, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/login", {
        email: email,
        password: password,
      });
      if (response.data) {
        setFlashMessage(response.data);
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
        if (response.data.flash === "success") {
          navigate("/users/vote");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setFlashMessage({
          message: "Email or password incorrect",
          flash: "error",
        });
      } else {
        setFlashMessage({
          message: error.response.data,
          flash: "error",
        });
      }
    }
  };
  return (
    <div className="col-md-4 offset-md-4 text-center formContainer my-5">
      <h2 className="my-4">Login</h2>
      <form
        onSubmit={loginUser}
        method="POST"
        className="formAuth needs-validation"
      >
        <div className="form-group mb-3">
          <label htmlFor="email" className="my-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
            spellCheck="false"
            required
          ></input>
          <div className="invalid-feedback">Input email!</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="my-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
            spellCheck="false"
            required
          ></input>
          <div className="invalid-feedback">Input password!</div>
        </div>
        <button className="btn btn-success btnNewCustom mt-4">Login</button>
      </form>
      <div className="mt-3 ">
        Don't have an account ?{" "}
        <Link to="/register" className="text-decoration-none">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
