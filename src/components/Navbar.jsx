import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 py-4 px-8 flex justify-between items-center border-b-4 border-pink-500">
      <div className="text-pink-500 font-pixel text-3xl flicker">FICTIONARY</div>
      <ul className="flex space-x-8">
        {["Play", "Rules", "Leaderboard", "Login"].map((item, index) => (
          <li
            key={index}
            className={`text-blue-300 font-pixel text-2xl cursor-pointer ${styles.popIn} ${
              item === "Login" ? styles.glowBorder : ""
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
