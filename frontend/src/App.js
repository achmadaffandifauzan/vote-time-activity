import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Vote from "./parts/Vote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/vote" exact element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
