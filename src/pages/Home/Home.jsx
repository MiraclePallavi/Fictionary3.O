import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import cityscape from "/assets/cityscape.png";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {jwtDecode} from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    setUser(decoded);
    setIsLoggedIn(true);
    navigate("/play"); // Redirect to the play page after successful login
    console.log("Login Success:", decoded);
  };

  const handleLoginFailure = () => {
    console.log("Login failed");
  };

  const handlePlayNow = (renderProps) => {
    if (isLoggedIn) {
      navigate("/play");
    } else {
      renderProps.onClick(); // Trigger Google login
    }
  };

  return (
    <div
      className="bg-dark-blue min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${cityscape})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      {/* Shooting Stars */}
      <div className="shooting-stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Twinkling Stars */}
      <div className="stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center pb-5 z-10">
        <h1 className="title text-neon-pink font-pixel flicker text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          FICTIONARY
        </h1>
        {/* Play Now Button with Google Auth */}
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          render={(renderProps) => (
            <button
              onClick={() => handlePlayNow(renderProps)}
              className="mt-10 px-8 py-4 text-3xl font-pixel text-blue-300 bg-pink-600 hover:bg-pink-700 glow-border hover:shadow-neon transition-all rounded-lg"
            >
              Play Now
            </button>
          )}
        />
      </div>

      <Footer className="footer" />
    </div>
  );
};

export default Home;
