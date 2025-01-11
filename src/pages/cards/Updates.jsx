import React, { useEffect, useState } from "react";
import "../Leaderboard/Leaderboard.css";
import UpdatePoint from "./UpdatePoint";

import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import useContext from "../context/UserContext";
const Updates = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const token = useContext().token;
  const navigate = useNavigate();
  const getLeaderboard = () => {
    fetch(endpoints.GET_UPDATES, {
      headers: {
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        navigate("/signin?redirected=true");
      } else {
        res.json().then((res) => {
          if (res.game_not_live) {
            navigate("/?redirected=true");
          } else {
            setLeaderboard(res.updates);
            console.log(res.updates);
          }
        });
      }
    });
  };


  useEffect(getLeaderboard, [token]);
  return (
    <>
      <div className="leaderboardItems">
        <h1 className="leaderboardHeader" data-text="Leaderboard"><span>Leaderboard</span></h1>
        {leaderboard.length !== 0 ? (
          <>
            {leaderboard.map((elem, index) => (
              <UpdatePoint
                className="score"
                text={elem.update_text}
                key={index}
              />
            ))}
          </>
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
    </>
  );
};

export default Updates;