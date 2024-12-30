import React, {useEffect, useState} from "react";
import useContext from "../context/UserContext";  // Ensure UserContext is imported correctly
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpShopView from "./PowerUpShopView";

const PowerUpShop = () => {
  const [cards, setCards] = useState({cardList: [], loaded: true});
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);

  const refreshUpdateState = () => {
    setUpdateState(!updateState);
  }

  const navigate = useNavigate();
  const context = useContext();

  const getCards = () => {
    setCards({ ...cards, loaded: false });
    
    fetch(endpoints.CARDS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`
      },
    }).then((res) => {
      if(res.status === 401){
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        setCards({
          cardList: res.cards,
          loaded: true
        });
      });
    });
  }

  const getUserCoins = () => {
    
    fetch(endpoints.GET_USER_COINS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`
      },
    }).then((res) => {
      if(res.status === 401){
        context.logout();
        navigate("/sign-in?redirected=true");
      }
      res.json().then((res) => {
        console.log(res);
        setUserCoins(res.coins);
      });
    });
  }

  useEffect(() => {
    getCards();
    getUserCoins();
  }, [context.token, updateState]);
  let cardItems;
  if(cards.cardList.size !== 0)
  {
    console.log('If statement entered');
    console.log(cards.cardList);
    cardItems = cards.cardList.map((card, index) => 
      <PowerUpShopView card = {card} refreshUpdateState={refreshUpdateState}/>
    );
    console.log(cardItems)
  }
  else{
    cardItems = <></>;
  }
  
  return(
    <div className="bg-gradient-to-b from-blue-950 via-purple-950 to-black min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-arcade text-yellow-400 mb-4 font-expo">
       Buy PowerUps 
      </h1>
      <h2 className="text-2xl font-arcade text-green-400 mb-8 font-expo">
        Coins: {userCoins}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl justify-center items-center">
        {cardItems}
      </div>
    </div>
  )
}

export default PowerUpShop;