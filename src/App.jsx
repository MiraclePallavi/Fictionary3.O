import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";

import PlayQuiz from "./pages/Play/PlayQuiz";

import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";

import LoggedInPage from "./pages/LoggedInPage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/play" element={<PlayQuiz />} />
        
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
  
      </Routes>
    </Router>
  );
};

export default App;
