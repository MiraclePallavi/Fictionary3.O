// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Play from "./pages/Play";
import Rules from "./pages/Rules";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
  
      </Routes>
    </Router>
  );
};

export default App;
