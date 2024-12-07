import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import PlayQuiz from "./pages/Play/PlayQuiz";

import Leaderboard from "./pages/Leaderboard/Leaderboard";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import LoggedInPage from "./pages/LoggedInPage";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />      <Routes>
        <Route path="/play" element={<PlayQuiz />} />
        
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/" element={<Home />} />
  
      </Routes>
    </Router>
  );
};

export default App;
