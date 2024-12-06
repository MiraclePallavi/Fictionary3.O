import React from "react";
import "./Score.css";

const Score = ({ rank, name, score, avatar, className }) => (
  <div className={`score ${className}`}>
    <div className="score-rank">{rank}</div>
    <img src={avatar} alt="User avatar" className="profile-picture" />
    <div className="score-name">{name}</div>
    <div className="score-points">{score} pts</div>
  </div>
);

export default Score;
