import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Vote from "./parts/Vote";
import Layout from "./Layout";

const App = () => {
  const [flashMessage, setFlashMessage] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <Layout
              flashMessage={flashMessage}
              setFlashMessage={setFlashMessage}
            >
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <Layout
              flashMessage={flashMessage}
              setFlashMessage={setFlashMessage}
            >
              <Register />
            </Layout>
          }
        />
        <Route
          path="/vote"
          exact
          element={
            <Layout
              flashMessage={flashMessage}
              setFlashMessage={setFlashMessage}
            >
              <Vote />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
