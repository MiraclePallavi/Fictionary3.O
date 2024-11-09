import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener when the menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-gray-900 py-4 px-8 flex justify-between items-center border-b-4 border-pink-500">
      <div className={`${styles.flicker} text-pink-500 font-pixel text-3xl`}>FICTIONARY</div>

      {/* Hamburger icon for mobile menu */}
      <div ref={toggleButtonRef} className="sm:hidden" onClick={toggleMenu}>
        {isOpen ? <Close className="text-pink-500" /> : <Menu className="text-pink-500" />}
      </div>

      {/* Desktop menu */}
      <ul className="hidden sm:flex space-x-8">
        {["Play", "Rules", "Leaderboard"].map((item, index) => (
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
      </ul>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center sm:hidden z-50"
        >
          <ul className="flex flex-col space-y-4">
            {["Play", "Rules", "Leaderboard"].map((item, index) => (
              <li key={index} className={`text-4xl text-pink-500 font-pixel py-2 ${styles.popIn}`}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
