import React from "react";
import "./PowerUpShopView.css";
import useContext from "../context/UserContext"; // Ensure UserContext is imported correctly
import ENDPOINTS from "../../utils/APIendpoints";
import powercard from "/assets/powercard.jpg";

const PowerUpShopView = ({ card, refreshUpdateState }) => {
  const context = useContext();
  const isAvailable = card.aval_cards[card.index] === "1";

  const handleClick = () => {
    if (!isAvailable) return; // Prevent click for unavailable cards

    fetch(ENDPOINTS.CHANGE_CARD_STATUS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
      body: JSON.stringify({ index: card.index, coins: card.coins }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => {
        console.log("Card status updated successfully");
        refreshUpdateState();
      })
      .catch((err) => console.error("Failed to update card status:", err));
  };

  return (
    <div
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative cards ${
        isAvailable ? "hover:shadow-green" : "hover:shadow-red"
      }`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${powercard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "370px",
        cursor: isAvailable ? "pointer" : "not-allowed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-purple-950 to-black  bg-opacity-50 rounded-lg">
        <div className="relative z-10 text-xl font-arcade uppercase mb-4 text-center mt-12">
          {card.text}
        </div>
        <div className="relative z-10 text-md mb-2 text-center ml-7 mr-7">{card.desc}</div>
        <div className="relative z-10 text-lg font-bold text-center">Coins: {card.coins}</div>
        {!isAvailable && (
          <div className="relative z-10 mt-4 text-center text-red-500 animate-pulse">
            Not Available
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerUpShopView;
