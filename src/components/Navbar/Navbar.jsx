import React, { useState, useEffect, useRef } from "react";
import { Menu, Close } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";
import useContext from "../../pages/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);



  const context = useContext();
  const navigate = useNavigate();

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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <nav className="bg-gray-900 py-4 px-8 flex justify-between items-center border-b-4 border-pink-500">
      <Link to="/">
      <div className={`${styles.flickering} text-pink-500  text-3xl cursor-pointer`}>
        FICTIONARY
      </div>
      </Link>
      <div ref={toggleButtonRef} className="lg:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <Close className="text-pink-500" />
        ) : (
          <Menu className="text-pink-500" />
        )}
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex space-x-8 mt-4">
        {["Play", "Leaderboard","PowerUps","PowerUpShop"].map((item, index) => (
          <li
            key={index}
            className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
        <li
          className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
          onClick={openModal}
        >
          Rules
        </li>
        <li className="text-blue-300 font-pixel text-xl cursor-pointer mb-2">
          
           {context.token || localStorage.getItem("fictionary_frontend") ? (
         
            <button onClick={handleLogout} className={styles.logoutButton}>LOG OUT</button>
          
        ) : (
         
            <button className={styles.loginButton} onClick={handleGoogleLogin}> SIGN IN</button>
          
        ) }
        </li>
      </ul>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center sm:hidden z-50"
        >
          <ul className="flex flex-col space-y-4 mt-3 pt-7">
            {["Play", "Leaderboard","PowerUps","PowerUpShop"].map((item, index) => (
              <li
                key={index}
                className={`text-blue-300 font-pixel text-xl cursor-pointer mt-6 ${styles.neonEffect}`}
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li
              className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
              onClick={openModal}
            >
              Rules
            </li>
            <li className="text-xl text-pink-500 font-pixel py-2">
            {context.token || localStorage.getItem("fictionary_frontend") ? (
         
         <button onClick={handleLogout} className={styles.logoutButton}>LOG OUT</button>
       
     ) : (
      
         <button className={styles.loginButton} onClick={handleGoogleLogin}> SIGN IN</button>
       
     ) }
            </li>
          </ul>
        </div>
      )}

      {/* Rules Modal */}
      <RulesModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;