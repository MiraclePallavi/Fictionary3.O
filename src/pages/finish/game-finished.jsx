import React from "react";
import { Link } from "react-router-dom"; 
import "./EventAd.module.css";
import bgImage from "/assets/bg.jpg";
import "../../index.css";

const GameFinished = () => {
  return (
    <>
      <div
        className="relative h-screen w-full flex flex-col items-center justify-center arcadeBackground"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="overlay-background"></div>
        <div className="shooting-stars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="stars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h1 className="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-cyan-500 flicker mb-4 font-pixel">
          GAME OVER
        </h1>
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-neon-green flicker mb-6 font-pixel">
          <span className="glowText">Upcoming Event</span>
        </h1>
        <h2 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-neon-blue font-pixel mb-4">
          Reverbrate!
        </h2>

        <a
          href="https://debsocnitdgp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-8 px-8 py-3 text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all font-pixel shadow-lg glowButton">
            Register Now
          </button>
        </a>

        <div className="mt-10 w-80 md:w-96 bg-black bg-opacity-40 backdrop-blur-lg rounded-lg p-6 shadow-lg border-4 border-neon-red neon-border text-white text-center">
          <h2 className="text-2xl font-bold text-neon-yellow flicker">
            Leaderboard
          </h2>
          <p className="mt-2 text-neon-blue">Check out the top players!</p>
          <Link
            to="/leaderboard"
            className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 rounded-lg text-black font-pixel shadow-md glowButton"
          >
            View Leaderboard
          </Link>
        </div>

        <div className="floatingStars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default GameFinished;
