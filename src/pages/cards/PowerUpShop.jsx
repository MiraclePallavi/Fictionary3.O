import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpShopView from "./PowerUpShopView";
import "./PowerUpShop.css"; // Add a custom CSS file for advanced styles

const PowerUpShop = () => {
  const [cards, setCards] = useState({ cardList: [], loaded: true });
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);

  const refreshUpdateState = () => {
    setUpdateState(!updateState);
  };

  const navigate = useNavigate();
  const context = useContext();

  const getCards = () => {
    setCards({ ...cards, loaded: false });

    fetch(endpoints.CARDS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        setCards({
          cardList: res.cards,
          loaded: true,
        });
      });
    });
  };

  const getUserCoins = () => {
    fetch(endpoints.GET_USER_COINS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/sign-in?redirected=true");
      }
      res.json().then((res) => {
        setUserCoins(res.coins);
      });
    });
  };

  useEffect(() => {
    getCards();
    getUserCoins();
  }, [context.token, updateState]);

  const cardItems =
    cards.cardList.length !== 0 ? (
      cards.cardList.map((card, index) => (
        <PowerUpShopView key={index} card={card} refreshUpdateState={refreshUpdateState} />
      ))
    ) : (
      <p className="text-white text-lg font-pixel text-center">No Power-Ups Available</p>
    );

  return (
    <div className="shop-container bg-gradient-to-b from-blue-950 via-purple-950 to-black min-h-screen flex flex-col items-center p-8">
      <h1 className="text-5xl text-neon-pink flicker mb-4 font-arcade">Power-Up Shop</h1>
      <h2 className="text-3xl text-neon-green mb-8 font-pixel">
        Coins: <span className="text-neon-yellow">{userCoins}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-center items-center">
        {cardItems}
      </div>
    </div>
  );
};

export default PowerUpShop;
