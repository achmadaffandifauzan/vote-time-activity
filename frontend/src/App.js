import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Vote from "./parts/Vote";
import Layout from "./Layout";
import axios from "axios";
import NewVote from "./vote/NewVote";
const baseURL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the current origin in production
    : "http://localhost:3100"; // Use localhost in development
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // to include credentials (session cookie)
  headers: { "Content-Type": "application/json" },
});
const App = () => {
  const [flashMessage, setFlashMessage] = useState(null);
  const { currentUser, setCurrentUser } = useState(null);
  // the flow of flashMessage state :
  // declared in App.js
  // pass it to Layout.js to display it (then also pass to Navbar)
  // also pass it to pages components (Login Register Vote) to modify the flashMessage state
  const getCurrentUser = async () => {
    try {
      const response = await api.get("/api/currentUser");
      if (response.data) {
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout flashMessage={flashMessage} setFlashMessage={setFlashMessage}>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <Login
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            }
          />
          <Route
            path="/register"
            exact
            element={
              <Register
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            }
          />
          <Route
            path="/vote/:voteId"
            element={
              <Vote
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            }
          />
          <Route
            path="/create"
            exact
            element={
              <NewVote
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
