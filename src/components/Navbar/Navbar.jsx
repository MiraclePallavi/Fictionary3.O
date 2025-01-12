import React, { useState, useEffect, useRef, useCallback  } from "react";
import { Menu, Close } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";
import useContext from "../../pages/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const context = useContext();
  const navigate = useNavigate();
  const refresh = useCallback(() => {
    fetch(endpoints.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive((live) => ({ ...live, ...serverResponse }));
        });
      }
    });
  }, []);
  const [gameLive, setGameLive] = useState({
      game_live: false,
      time_up: false,
      date: new Date(),
    });
  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (token) {
      if (gameLive.game_live) {
       setGameLive(true)
      }
    } else {
      refresh();
    }
  }, [context.token, gameLive.game_live, navigate, refresh]
);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
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
            .then((backendResponse) => {
              if (backendResponse.token) {
                context.login(backendResponse.token);
                navigate("/play");
              } else {
                console.error("Failed to log in:", backendResponse.message);
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

  const handleLogout = () => {
    context.logout();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {context.token || localStorage.getItem("fictionary_frontend") ? (
        <nav className="bg-gray-900 py-3 px-8 flex justify-between items-center border-b-4 border-pink-500">
          <Link to="/">
            <div className={`${styles.flickering} text-pink-500 cursor-pointer font-operius  sm:text-1xl md:text-2xl lg:text-3xl xl:text-3xl`}>
              FICTIONARY
            </div>
          </Link>
          <div ref={toggleButtonRef} className="2xl:hidden" onClick={toggleMenu}>
            {isOpen ? <Close className="text-pink-500" /> : <Menu className="text-pink-500" />}
          </div>

          {/* Desktop menu */}
          <ul className="hidden xl:flex space-x-8 mt-4">
            {["Play", "Leaderboard"].map((item, index) => (
              <li
                key={index}
                className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
           
            {gameLive && ["PowerUps", "PowerUpShop","Updates"].map((item, index) => (
              <li
                key={index}
                className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
            <li className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`} onClick={openModal}>
              Rules
            </li>
            <li className="text-blue-300 font-pixel text-xl cursor-pointer mb-2">
              <button onClick={handleLogout} className={styles.logoutButton}>LOG OUT</button>
            </li>
          </ul>
          {isOpen && (
            <div
              ref={menuRef}
              className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center xl:hidden z-50"
            >
              <button
                className="absolute top-5 right-5 text-white text-1xl"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </button>

              <ul className="flex flex-col space-y-12 mt-3 pt-7 text-1xl">
                {["Play", "Leaderboard"].map((item, index) => (
                  <li
                    key={index}
                    className={`text-blue-300 font-pixel text-1xl cursor-pointer mt-6 ${styles.neonEffect}`}
                  >
                    <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
                {gameLive && ["PowerUps", "PowerUpShop","Updates"].map((item, index) => (
                  <li
                    key={index}
                    className={`text-blue-300 font-pixel text-1xl cursor-pointer mt-6 ${styles.neonEffect}`}
                  >
                    <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
                <li
                  className={`text-blue-300 font-pixel text-1xl cursor-pointer ${styles.neonEffect}`}
                  onClick={openModal}
                >
                  Rules
                </li>
                <li className="text-xl text-pink-500 font-pixel py-2">
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    LOG OUT
                  </button>
                </li>
              </ul>
            </div>
          )}

          <RulesModal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
