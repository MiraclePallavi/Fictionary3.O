import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Home.css";
import cityscape from "/assets/cityscape.png";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const token = tokenResponse.credential || tokenResponse.access_token;

        console.log("Received token:", token); // Debug: check the token

        // Validate token format
        if (!token || token.split(".").length !== 3) {
          throw new Error("Invalid token format");
        }

        // Decode the token if valid
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        setUser(decoded);
        setIsLoggedIn(true);

        // Save the token to localStorage for persistence
        localStorage.setItem("userToken", token);

        navigate("/play"); // Redirect to play page
        console.log("Login Success:", decoded);
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token in localStorage:", error.message);
        localStorage.removeItem("userToken"); // Clear invalid token
      }
    }
  }, []);

  const handlePlayNow = () => {
    if (isLoggedIn) {
      navigate("/play");
    } else {
      handleGoogleLogin();
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
        {/* Play Now Button */}
        <button
          onClick={handlePlayNow}
          className="mt-10 px-8 py-4 text-3xl font-pixel text-blue-300 bg-glass hover:bg-pink-700 glow-border hover:shadow-neon transition-all rounded-lg neonEffect"
        >
          {isLoggedIn ? "Play Now" : "Play"}
        </button>
      </div>

      <Footer className="footer" />
    </div>
  );
};

export default Home;
