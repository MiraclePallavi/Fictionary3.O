import React, { useState, useEffect, useRef } from "react";
import { Menu, Close } from "@mui/icons-material";
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";
import { Link } from "react-router-dom";

import GoogleAuth from "../../pages/Login/GoogleAuth"; // Adjust path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLoginSuccess = (decodedUser) => {
    setUser(decodedUser);
    setIsLoggedIn(true);
    console.log("Login Success:", decodedUser);
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log("Logged out successfully");
  };

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
      <div className={`${styles.flicker} text-pink-500 font-pixel text-3xl`}>
        FICTIONARY
      </div>

      <div ref={toggleButtonRef} className="sm:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <Close className="text-pink-500" />
        ) : (
          <Menu className="text-pink-500" />
        )}
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex space-x-8">
        {["Play", "Leaderboard"].map((item, index) => (
          <li
            key={index}
            className={`text-blue-300 font-pixel text-2xl cursor-pointer ${styles.popIn} ${
              item === "Play" ? styles.glowBorder : ""
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
        <li
          className="text-blue-300 font-pixel text-2xl cursor-pointer"
          onClick={openModal}
        >
          Rules
        </li>
        {/* Google Auth Component */}
        <li className="text-blue-300 font-pixel text-2xl cursor-pointer">
          <GoogleAuth
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        </li>
      </ul>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center sm:hidden z-50"
        >
          <ul className="flex flex-col space-y-4">
            {["Play", "Leaderboard"].map((item, index) => (
              <li
                key={index}
                className={`text-4xl text-pink-500 font-pixel py-2 ${styles.popIn}`}
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            {/* Google Auth Component for Mobile */}
            <li className="text-4xl text-pink-500 font-pixel py-2">
              <GoogleAuth
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
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
