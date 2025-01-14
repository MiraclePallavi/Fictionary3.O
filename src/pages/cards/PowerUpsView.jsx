import React, { useEffect, useState } from "react";
import "./PowerUpsView.css";
import useContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/APIendpoints";
import powercard from "/assets/powercard.jpg";

const PowerUpsViews = ({ card, refreshUpdateState, onCardRedeemed }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [available, setAvailable] = useState(false);

  const navigate = useNavigate();
  const context = useContext();

  const checkAval = () => {
    setAvailable(card.aval_cards[card.index] === "1");
    console.log("CheckAval");
  };

  const handleClick = () => {
    fetch(ENDPOINTS.CHANGE_CARD_STATUS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
      body: JSON.stringify({ index: card.index, coins: card.coins }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Button clicked");
        console.log(card.coins);
        refreshUpdateState(); 
        if (onCardRedeemed) {
          onCardRedeemed(card.desc);
        }
      });

    setIsClicked(!isClicked);
  };

  useEffect(() => {
    checkAval();
  }, [card, isClicked]);

  if (!available) return null;

  return (
    <div
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative ${
        available ? "hover:shadow-green" : "hover:shadow-red"
      }`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${powercard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "350px",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg">
        <div className="relative z-10 text-xl font-arcade uppercase mb-4 flex-auto mt-12 text-center">
          {card.text}
        </div>
        <div className="relative z-10 text-sm mb-2 ml-5 mr-5 text-center">{card.desc}</div>
        <div className="relative z-10 text-lg font-bold text-center">Coins: {card.coins}</div>
      </div>
    </div>
  );
};

export default PowerUpsViews;
