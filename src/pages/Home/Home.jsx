import React, { useEffect, useState, useCallback , useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useContext from "../context/UserContext";
import Footer from "../../components/Footer/Footer";
import cityscape from "/assets/cityscape.png";
import characterSprite from "/assets/character.png";
import endpoints from "../../utils/APIendpoints";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import bg from "/assets/bg.jpg";
import { Link } from "react-router-dom";
import Timer from "../../components/Timer/Timer";
const Home = () => {
  const navigate = useNavigate();
  const context = useContext();
  const [characterPosition, setCharacterPosition] = useState({
    left: 0,
    top: 0,
  });
  const [dialogue, setDialogue] = useState("Welcome, Player!");
  const [playSignGlowing, setPlaySignGlowing] = useState(false);
  const [actionButtonGlow, setActionButtonGlow] = useState(false);
  const [gameLive, setGameLive] = useState({
    game_live: false,
    time_up: false,
    date: new Date(),
  });

  const refresh = useCallback(() => {
    fetch(endpoints.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive((live) => ({ ...live, ...serverResponse }));
        });
      }
    });
  }, []);

  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (token && gameLive.game_live) {
      navigate("/play");
    }
    else if(gameLive.time_up) {
      navigate("/game-finished");
    }  else {
      refresh();
    }
  }, [context.token, gameLive.game_live,gameLive.time_up, navigate, refresh]);

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
  const timeoutDate = useMemo(() => gameLive.date, [gameLive]);
  const handlePlayNow = () => {
    if (context.token || localStorage.getItem("fictionary_frontend")) {
      if (gameLive.game_live) {
        navigate("/play");
      } else {
        setDialogue("The game is not live yet!");
      }
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
      setPlaySignGlowing(true);
    }, 1500);

    const returnToActionTimer = setTimeout(() => {
      setCharacterPosition({ left: 50, top: "80%" });
      setDialogue("Let's Begin!");
      setActionButtonGlow(true);
    }, 3000);

    return () => {
      clearTimeout(moveToPlayTimer);
      clearTimeout(playGlowTimer);
      clearTimeout(returnToActionTimer);
    };
  }, []);

  return (

    <div
      className="bg-dark-blue h-screen flex flex-col relative overlay"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay-background"></div>
      <div className="shooting-stars">
        <span></span>
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
          <div className="speech-bubble">{dialogue}</div>
        </div>
        <div className="flex items-center justify-center">
  <div className="sign font-pixel text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-white">
    <span className="fast-flicker">F</span>ICT<span className="fast-flicker">I</span>O
    <span className="flicker">N</span>ARY
  </div>
</div>
<br />
        {context.token || localStorage.getItem("fictionary_frontend") ? (
  gameLive.game_live ? (
    <div className="play_now mt-7">
      <Link to="/question" className="play retro-btn">
        PLAY NOW
      </Link>
    </div>
  ) : (
    <div className="time">
      <br />
      {true ? (
        <>
          <Timer timer={timeoutDate} refresh={refresh} />
          {new URLSearchParams(window.location.search).get("redirected") ===
            "true" && (
            <div className="game-not-live arcade-text">
              The game is not live yet!
            </div>
          )}
        </>
      ): (
        <div className="time-up">

        </div>
      )}
    </div>
  )
) : (
  <>
    <div className="ComSoon arcade-text">
      
      {/*Coming Soon*/}
    </div>
    <div className="play_now mt-7">
      <button className="play retro-btn" onClick={handleGoogleLogin}>
        
        Sign In
      </button>
    </div>
  </>
)}

        <Footer className="footer mt-7" />
      </div>
    </div>
   
  );
};

export default Home;
