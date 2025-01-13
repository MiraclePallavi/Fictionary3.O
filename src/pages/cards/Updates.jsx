import React, { useEffect, useState } from "react";
import "./Updates.css"; 
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
        console.error("Error fetching updates:", error);
      });
  };

  useEffect(() => {
    getLeaderboard();
  }, [token]);

  return (
    <div className="update-container">
    <div className="updateItems">
      <h1
        className="updateHeader sm:text-2xl retro-header"
        data-text="Gaming Updates"
      >
        <span>Updates Feed</span>
      </h1>
      {leaderboard.length !== 0 ? (
        <div className="data-box-container">
          {leaderboard.map((elem, index) => (
            <div key={elem.id || index} className="data-box">
              <UpdatePoint
                text={elem.update_text}
                player={elem.player}
                points={elem.points}
                isIncrease={elem.isIncrease}
              />
            </div>
          ))}
        </div>
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
    
  );
};

export default Updates;
