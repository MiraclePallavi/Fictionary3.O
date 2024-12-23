import React, {useEffect, useState} from "react";
import "./PowerUpShopView.css";
import useContext from "../context/UserContext";  // Ensure UserContext is imported correctly
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/APIendpoints";
import powercard from "/assets/powercard.jpg";

const PowerUpShopView = ({card, refreshUpdateState}) => {

    const [isClicked, setIsClicked] = useState(false);
    const [available, setAvailable] = useState(false);


    const navigate = useNavigate();
    const context = useContext();

    let checkAval = () => {
        setAvailable(card.aval_cards[card.index] === '1');
        console.log('CheckAval')
    }

    let handleAvalText = () => {
        if(available){
            return(<></>
            )
        } else {
            return(<></>)
        }
    }

    let handleClick = () => {
        fetch(ENDPOINTS.CHANGE_CARD_STATUS, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Token ${
                    context.token || localStorage.getItem("fictionary_token")
                }`,

            },
            body: JSON.stringify({index : card.index, coins: card.coins}),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('button clicked');
                console.log(card.coins);
                refreshUpdateState();
            })
        setIsClicked(!isClicked);
    }

    useEffect(checkAval, [card, isClicked]);

    if(!available){
        return (
            <div
            className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative cards ${
              available ? "hover:shadow-green" : "hover:shadow-red"
            }`}
            onClick={handleClick}
            style={{
              backgroundImage: `url(${powercard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height:"370px"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"> {/* Add overlay */}
            <div className="relative z-10 text-xl font-arcade uppercase mb-4 text-center mt-12">
              {card.text}
            </div>
            <div className="relative z-10 text-md mb-2 text-center ml-7 mr-7 ">{card.desc}</div>
            <div className="relative z-10 text-lg font-bold text-center">Coins: {card.coins}</div>
            {!available && (
              <div className="relative z-10 mt-4 text-center text-red-500 animate-pulse">
                Not Available
              </div>
            )}
          </div>
          </div>
        )
    } else {
        return (<></>)
    }
}

export default PowerUpShopView;