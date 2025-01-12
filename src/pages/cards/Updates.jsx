import React, { useEffect, useState } from "react";
import "./Updates.css"; // Updated CSS file for gaming updates
import UpdatePoint from "./UpdatePoint";

import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import useContext from "../context/UserContext";

import bg from "/assets/bg.jpg";

const Updates = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { token } = useContext(useContext);
  const navigate = useNavigate();

  const getLeaderboard = () => {
    fetch(endpoints.GET_UPDATES, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/signin?redirected=true");
          return null;
        }
        return res.json();
      })
      .then((res) => {
        if (res?.game_not_live) {
          navigate("/?redirected=true");
        } else if (res?.updates) {
          setLeaderboard(res.updates);
        }
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
      });
  };

  useEffect(() => {
    getLeaderboard();
  }, [token]);

  return (
    <div
      className="bg-dark-blue min-h-screen flex flex-col"
      style={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
          <h1 className="leaderboardHeader" data-text="Gaming Updates">
            <span>Updates Feed</span>
          </h1>
          {leaderboard.length !== 0 ? (
            leaderboard.map((elem, index) => (
              <UpdatePoint
                key={elem.id || index}
                text={elem.update_text}
                player={elem.player} 
                points={elem.points}
                isIncrease={elem.isIncrease} 
              />
            ))
          ) : (
            <div className="loader">
              <ColorRing
                visible={true}
                height="135"
                width="135"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#f2e0d6", "#f2e0d6", "#f2e0d6", "#f2e0d6", "#f2e0d6"]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Updates;
