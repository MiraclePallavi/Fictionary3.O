import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext"; 
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpsViews from "./PowerUpsView";
import "./PowerUpShopView.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./GamingToast.css";
const PowerUps = () => {
  const [cards, setCards] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);

  const refreshUpdateState = () => {
    setUpdateState(!updateState);
  };

  const navigate = useNavigate();
  const context = useContext();
  
  const getCards = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(endpoints.CARDS, {
        headers: {
          Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
        },
      });

      if (response.status === 401) {
        context.logout();
        navigate("/signin?redirected=true");
        return;
      }

      const data = await response.json();
      setCards(data.cards || []); 
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  const showCardRedeemedAlert = (cardDescription) => {
    toast(`🕹️ Power-Up Used: ${cardDescription} ⚡`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: "🎮", 
      className: "gaming-toast", 
    });
  };
  
  const getUserCoins = async () => {
    try {
      const response = await fetch(endpoints.GET_USER_COINS, {
        headers: {
          Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
        },
      });

      if (response.status === 401) {
        context.logout();
        navigate("/sign-in?redirected=true");
        return;
      }

      const data = await response.json();
      setUserCoins(data.coins || 0); 
    } catch (error) {
      console.error("Error fetching user coins:", error);
    }
  };

  useEffect(() => {
    getCards();
    getUserCoins();
  }, [context.token, updateState]);

  let cardItems;
  if (isLoading) {
   
    cardItems = (
      <div className="text-center text-gray-400 font-expo text-xl mt-8">
        Loading Power Cards...
      </div>
    );
  } else if (cards.length > 0) {
  
    cardItems = cards.map((card, index) => (
      <PowerUpsViews
       key={index} 
       card={card} 
       refreshUpdateState={refreshUpdateState}
       onCardRedeemed={showCardRedeemedAlert} 
       />
    ));
  } else {
    
    cardItems = (
      <div className="text-center text-gray-400 font-expo text-xl mt-8">
        You have no Power Cards right now. Check back later!
      </div>
    );
  }
 

  return (
    <>
    
    <div className="bg-gradient-to-b from-blue-950 via-purple-950 to-black min-h-screen flex flex-col items-center p-8 ">
      <h1 className="text-3xl font-arcade text-yellow-400 mb-4 font-expo text-neon-yellow">
        PowerUps Available
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl cards items-center justify-center">
        {cardItems}
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default PowerUps;
