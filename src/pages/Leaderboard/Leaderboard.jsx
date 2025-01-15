import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";  // Ensure UserContext is imported correctly
import { useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";
import { ColorRing } from "react-loader-spinner";
import Score from "./Score";
import cityscape from "/assets/cityscape.png";
import bg from "/assets/bg.jpg";
import "../../index.css"
import "./Leaderboard.css";
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = useContext().token;
  const navigate = useNavigate();

  const getLeaderboard = () => {
    setLoading(true); // Set loading to true before fetching data
    fetch(endpoints.LEADERBOARD, {
      headers: {
        Authorization: `Token ${token || localStorage.getItem("fictionary_token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/sign-in?redirected=true");
        } else {
          res.json().then((res) => {
            if (res.game_not_live) {
              navigate("/?redirected=true");
            } else {
              setLeaderboard(res.leaderboard);
            }
          });
        }
      })
      .finally(() => setLoading(false)); 
  };

  useEffect(() => {
    getLeaderboard();
  }, [token]);

  return (
    
      <div
        className="bg-dark-blue min-h-screen flex flex-col relative"
        style={{
          height: "88vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight:"100vh",
          position:"sticky",
        }}
      >
         <div
      className="overlay-background"
      ></div>
        <div className="leaderboard-container">
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
      <div className="leaderboardItems">
      <h1 className="leaderboardHeader" data-text="Leaderboard">
        Leaderboard
      </h1>

        {loading ? (
          <div className="loader">
           <ColorRing
             visible={true}
             height="135"
             width="135"
             ariaLabel="loading"
             wrapperClass="spinner"
             colors={[
               "#ff00e4", 
               "#00ffcc", 
               "#fffb00", 
               "#ff6f00",
               "#0000ff", 
             ]}
           />
          </div>
        ) : leaderboard.length ? (
         
          leaderboard.map((elem, index) => (
            <Score
              className={`score ${
                index === 0
                  ? "first-place"
                  : index === 1
                  ? "second-place"
                  : index === 2
                  ? "third-place"
                  : ""
              }`}
              name={elem.name}
              score={elem.points}
              avatar={elem.avatar}
              rank={index + 1}
              key={index}
            />
          ))
        ) : (
      
          <p className="no-data">No data available</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Leaderboard;