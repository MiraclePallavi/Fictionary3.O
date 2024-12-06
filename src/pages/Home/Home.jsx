import React from "react";
import "./Home.css"; 
import cityscape from "/assets/cityscape.png";

const Home = () => {
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
      </div>
    </div>
  );
};

export default Home;
