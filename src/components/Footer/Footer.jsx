// src/components/Footer/Footer.js
import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-75 py-4 flex justify-center items-center space-x-6 text-white">
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500 transition duration-200">
        <YouTubeIcon fontSize="large" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition duration-200">
        <InstagramIcon fontSize="large" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition duration-200">
        <FacebookIcon fontSize="large" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition duration-200">
        <LinkedInIcon fontSize="large" />
      </a>
    </footer>
  );
};

export default Footer;
