// src/components/Footer/Footer.js
import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "./Footer.module.css"; // Assuming your CSS for ripple effect is here
import { Link } from "react-router-dom";

const SocialLinks = () => {
  const handleClick = (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
    ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600); // Removes ripple after animation
  };

  return (
    <div className="social-links">
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="social-icon youtube"
      >
       <FacebookIcon />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="social-icon instagram"
      >
       <YouTubeIcon />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="social-icon instagram"
      >
       <LinkedInIcon />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="social-icon instagram"
      >
       <InstagramIcon />
      </a>
      {/* Add more social links as needed */}
    </div>
  );
};

export default SocialLinks;

