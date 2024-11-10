import React, { useState } from "react";
import "./Home.css"; // Custom styles
import cityscape from "/assets/cityscape.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the ID token

const Home = () => {
 

  

  return (
    <div
      className="bg-dark-blue min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${cityscape})`, // Correct syntax for backgroundImage
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-grow flex flex-col items-center justify-center pb-5 z-10">
        <h1 className="title text-neon-pink font-pixel flicker text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          FICTIONARY
        </h1>

      </div>
    </div>
  );
};

export default Home;
