import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import PlayQuiz from "./pages/Play/PlayQuiz";

import Leaderboard from "./pages/Leaderboard/Leaderboard";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import PowerUps from "./pages/cards/PowerUps";
import Question from "./pages/Play/Question";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/play" element={<Question />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
  <Route path="/sign-in" element={<Login />} />
  <Route path="/cards" element={<PowerUps />} />
  <Route path="*" element={<div>404 - Page Not Found</div>} />
</Routes>

    </Router>
  );
};

export default App;
