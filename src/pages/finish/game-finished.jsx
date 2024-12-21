import React from 'react';
import './GameFinished.css';
import { Link } from 'react-router-dom';
import bg from "/assets/bg.jpg";
const GameFinished = () => {
  return (
      <div
              className="bg-dark-blue h-screen flex flex-col relative"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
    <div className="game-finished-container press-2p">
      <div className="game-finished-content">
        <h1 className="game-over-title">GAME OVER</h1>
       
        <div className="buttons">
          
          <Link to="/"><button className="btn neon-btn">Home</button></Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GameFinished;
