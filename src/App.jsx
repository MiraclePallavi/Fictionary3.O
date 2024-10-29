// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Play from "./pages/Play";
import Rules from "./pages/Rules";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
