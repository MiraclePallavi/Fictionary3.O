import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useContext from "../context/UserContext";
import Footer from "../../components/Footer/Footer";
import cityscape from "/assets/cityscape.png";
import characterSprite from "/assets/character.png";
import endpoints from "../../utils/APIendpoints";
import "./Home.css";
import bg from "/assets/bg.jpg";
const Home = () => {
  const navigate = useNavigate();
  const context = useContext();
  const [characterPosition, setCharacterPosition] = useState({ left: 0, top: 0 });
  const [dialogue, setDialogue] = useState("Welcome, Player 1!");
  const [playSignGlowing, setPlaySignGlowing] = useState(false);
  const [actionButtonGlow, setActionButtonGlow] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
        .then((res) => res.json())
        .then((userInfo) => {
          fetch(endpoints.SOCIAL_LOGIN_TOKEN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
              ...userInfo,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.token) {
                context.login(data.token);
                navigate("/play");
              }
            })
            .catch((error) => console.error("Backend login error:", error));
        })
        .catch((error) => console.error("Google login error:", error));
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handlePlayNow = () => {
    if (context.token || localStorage.getItem("fictionary_frontend")) {
      navigate("/play");
    } else {
      handleGoogleLogin();
    }
  };

  useEffect(() => {
   
    setCharacterPosition({ left: 50, top: "80%" });

    const moveToPlayTimer = setTimeout(() => {
      setCharacterPosition({ left: "50%", top: "50%" }); 
    }, 1000);

    const playGlowTimer = setTimeout(() => {
      setPlaySignGlowing(true); // Glow Play button
    }, 1500);

    const returnToActionTimer = setTimeout(() => {
      setCharacterPosition({ left: 50, top: "80%" }); // Return to Action button
      setDialogue("Let's Begin!");
      setActionButtonGlow(true); // Glow Action button
    }, 3000);

    return () => {
      clearTimeout(moveToPlayTimer);
      clearTimeout(playGlowTimer);
      clearTimeout(returnToActionTimer);
    };
  }, []);

  return (
    <div
      className="bg-dark-blue h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="shooting-stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center pb-5 z-10">
        {/* Pixel-Art Character */}
        <div
          className="character-container"
          style={{
            position: "absolute",
            left: characterPosition.left,
            top: characterPosition.top,
            transform: "translate(-50%, -50%)",
            transition: "left 1s, top 1s",
          }}
        >
          <img
            src={characterSprite}
            alt="Character"
            className="character-sprite"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          {/* Speech Bubble */}
          <div className="speech-bubble">{dialogue}</div>
        </div>

        {/* Event Title */}
        <h1 className="title text-neon-pink font-[PressStart2P, 'Courier New', monospace] flicker text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
  FICTIONARY
</h1>

        {/* Play Button */}
        <button
  onClick={handlePlayNow}
  className={`mt-10 px-8 py-4 text-2xl font-bold font-pixel text-blue-300 bg-glass hover:bg-pink-700 glow-border hover:shadow-neon transition-all rounded-lg neonEffect ${
    playSignGlowing ? "glowing" : ""
  }`}
>
  <span className="play-text">Play</span>
</button>


        {/* On-Screen Controls */}
       
        <Footer className="footer" />
      </div>

      
    </div>
  );
};

export default Home;
