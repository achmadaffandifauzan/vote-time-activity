import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vote from "./pages/Vote";
import Vote2 from "./pages/Vote2";
import Vote3 from "./pages/Vote3";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/vote" exact element={<Vote />} />
        <Route path="/vote2" exact element={<Vote2 />} />
        <Route path="/vote3" exact element={<Vote3 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
