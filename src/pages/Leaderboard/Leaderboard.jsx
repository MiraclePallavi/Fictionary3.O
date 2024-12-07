import React from "react";
import "./Leaderboard.css";
import Score from "./Score";
import cityscape from "/assets/cityscape.png"; 
import NavBar from "../../components/Navbar/Navbar";
const dummyLeaderboard = [
  { rank: 1, name: "Sanket", points: 350, avatar: "https://via.placeholder.com/50" },
  { rank: 2, name: "Ankita", points: 340, avatar: "https://via.placeholder.com/50" },
  { rank: 3, name: "Vardan", points: 280, avatar: "https://via.placeholder.com/50" },
  { rank: 4, name: "Nikunj", points: 260, avatar: "https://via.placeholder.com/50" },
  { rank: 5, name: "Puranjay", points: 260, avatar: "https://via.placeholder.com/50" },
];

const Leaderboard = () => {
  return (
    <>
     <div className="bg-dark-blue min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${cityscape})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
      }} >
     
    <div className="leaderboardItems">
      <h1 className="leaderboardHeader" data-text="Leaderboard">
        Leaderboard
      </h1>
      {dummyLeaderboard.map((elem, index) => (
        <Score
          name={elem.name}
          score={elem.points}
          avatar={elem.avatar}
          rank={elem.rank}
          key={index}
          className={`score ${index === 0 ? "first-place" : index === 1 ? "second-place" : index === 2 ? "third-place" : ""}`}
        />
      ))}
    </div>
    </div>
    </>
  );
};

export default Leaderboard;
