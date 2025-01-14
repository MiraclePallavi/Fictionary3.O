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
    <div className="bg-gradient-to-b from-blue-950 via-purple-950 to-black min-h-screen flex flex-col items-center ">
    <div className="update-container">
    <div className="updateItems">
      <h1
        className="updateHeader sm:text-2xl retro-header"
        data-text="Gaming Updates"
      >
        <span>Updates Feed</span>
        <br />
       
      </h1>
      <span className="font-arcade sm:text-xl text-white text-center">The updates will appear here when someone uses a power card</span>
     
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
      )}
    </div>
  </div>
  </div>

    
  );
};

export default Updates;
