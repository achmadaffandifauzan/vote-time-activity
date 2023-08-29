import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Login from "./user/Login";
import Register from "./user/Register";
import Vote from "./vote/submit/Vote";
import Layout from "./Layout";
import axios from "axios";
import NewVote from "./vote/create/NewVote";
import ManageVote from "./vote/manage/ManageVote";
import OwnedVote from "./user/OwnedVote";
import Landing from "./Landing";

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
  const [currentUser, setCurrentUser] = useState(null);
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
      setCurrentUser(null);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout
        flashMessage={flashMessage}
        setFlashMessage={setFlashMessage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      >
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <Login
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/vote/:voteId"
            element={
              <Vote
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/vote/:voteId/manage"
            // exact
            element={
              <ManageVote
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/users/vote"
            // exact
            element={
              <OwnedVote
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/"
            exact
            element={
              <Landing
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
