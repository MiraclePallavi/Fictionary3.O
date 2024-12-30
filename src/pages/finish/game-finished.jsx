import React, { useState } from "react";
import styles from "./EventAd.module.css";
import bgImage from "/assets/bg.jpg";
const GameFinished = () => {
  const [gameOver, setGameOver] = useState(true); 

  return (
    <div
      className={`relative h-screen w-full flex flex-col items-center justify-center ${styles.arcadeBackground}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
     
          <h1 className="text-6xl sm:text-4xl md:text-8xl font-bold text-neon-red flicker mb-4 font-pixel">
            GAME OVER
          </h1>
       

      {/* Neon Header */}
      <h1 className="text-5xl sm:text-6xl md:text-4xl font-bold text-neon-pink flicker mb-6 font-pixel">
        <span className={styles.glowText}>Upcoming Event</span>
      </h1>

      {/* Event Details */}
      
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-neon-blue font-pixel mb-4">
          Reverbrate!
        </h2>
       

      {/* Call to Action */}
      <button
        className={`mt-8 px-6 py-3 text-1xl text-black bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink rounded-lg transition-all font-pixel ${styles.glowButton}`}
      >
       Register Now
      </button>

      {/* Floating Neon Stars */}
      <div className={styles.floatingStars}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default GameFinished;
