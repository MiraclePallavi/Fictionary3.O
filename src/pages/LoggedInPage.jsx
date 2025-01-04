import React from "react";
import { useLocation } from "react-router-dom";
import "./LoggedInPage.css"; 
import "../../index.css"

const LoggedInPage = () => {
  const location = useLocation();
  const user = location.state?.user;

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
            <span></span>
          </div>
          <div className="stars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
    <div className="bg-dark-blue">
      <nav className="navbar">
        <h1 className="welcome-text">Welcome, {user?.given_name}!</h1>
      </nav>
      <div className="profile-container">
      </div>
    </div>
    </div>
  );
};

export default LoggedInPage;