import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Menu, Close } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize user state from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Fetch user info from Google's API
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
        .then((res) => res.json())
        .then((userInfo) => {
          localStorage.setItem("user", JSON.stringify(userInfo));
          setUser(userInfo);
          setIsLoggedIn(true);
          console.log("Logged in:", userInfo);
          navigate("/play"); // Redirect to Play page after login
        })
        .catch((error) => console.error("Google login error:", error));
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    console.log("Logged out successfully");
    navigate("/"); // Redirect to Home page after logout
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
      <div className={`${styles.flickering} text-pink-500 font-pixel text-3xl`}>
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
            className={`text-blue-300 font-pixel text-3xl cursor-pointer ${styles.neonEffect}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
        <li
          className={`text-blue-300 font-pixel text-3xl cursor-pointer ${styles.neonEffect}`}
          onClick={openModal}
        >
          Rules
        </li>
        <li className="text-blue-300 font-pixel text-2xl cursor-pointer">
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <button onClick={handleGoogleLogin} className={styles.loginButton}>
              Login
            </button>
          )}
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
                className={`text-4xl text-pink-500 font-pixel py-2 ${styles.popIn} neonEffect`}
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
              className={`text-blue-300 font-pixel text-3xl cursor-pointer ${styles.neonEffect}`}
              onClick={openModal}
            >
              Rules
            </li>
            <li className="text-4xl text-pink-500 font-pixel py-2">
              {isLoggedIn ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className={styles.loginButton}
                >
                  Login
                </button>
              )}
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
