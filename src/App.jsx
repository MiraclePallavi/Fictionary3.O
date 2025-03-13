import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import PowerUps from "./pages/cards/PowerUps";
import PowerUpShop from "./pages/cards/PowerUpShop";
import Question from "./pages/Play/Question";
import Navbar from "./components/Navbar/Navbar";
import GameFinished from "./pages/finish/game-finished";

import Updates from "./pages/cards/Updates";
const App = () => {
  return (
  <Router>
    <Navbar />  
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Question />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/powerups" element={<PowerUps />} />

      <Route path="/powerupshop" element={<PowerUpShop />} />
      <Route path="/game-finished" element={<GameFinished />} />
      <Route path="/updates" element={<Updates />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />

    </Routes>

  </Router>
  );
};

export default App;