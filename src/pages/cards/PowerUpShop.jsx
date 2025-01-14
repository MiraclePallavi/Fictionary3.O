import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpShopView from "./PowerUpShopView";
import "./PowerUpShop.css"; 

const PowerUpShop = () => {
  const [cards, setCards] = useState({ cardList: [], loaded: true });
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);
  const [gameLive, setGameLive] = useState(true);
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
        return;
      }
      res.json().then((res) => {
        if (res.game_not_live) {
          setGameLive(false);
          navigate("/?redirected=true");
        } else {
          setCards({
            cardList: res.cards,
            loaded: true,
          });
        }
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
        return;
      }
      res.json().then((res) => {
        setUserCoins(res.coins);
      });
    });
  };

  useEffect(() => {
    if (gameLive) {
      getCards();
      getUserCoins();
    } else {
      navigate("/?redirected=true");
    }
  }, [context.token, updateState, gameLive]);

  const cardItems =
    cards.cardList.length !== 0 ? (
      cards.cardList.map((card, index) => (
        <PowerUpShopView  card={card} refreshUpdateState={refreshUpdateState} />
      ))
    ) : (
      <p className="text-white text-lg font-pixel text-center">No Power-Ups Available</p>
    );

  return (
    <div className="shop-container bg-gradient-to-b from-blue-950 via-purple-950 to-black min-h-screen flex flex-col items-center p-8">
      <h1 className="xl:text-4xl sm:text-2xl md:text-3xl lg:text-3xl text-neon-pink flicker mb-4 font-arcade text-neon-yellow">Power-Up Shop</h1>
      <h2 className="xl:text-3xl sm:text-2xl md:text-3xl lg:text-3xl text-neon-green mb-8 font-pixel">
        Coins: <span className="text-neon-yellow">{userCoins}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-center items-center">
        {cardItems}
      </div>
    </div>
  );
};

export default PowerUpShop;
