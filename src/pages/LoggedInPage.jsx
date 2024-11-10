import React from "react";
import { useLocation } from "react-router-dom";
import "./LoggedInPage.css"; // Custom CSS

const LoggedInPage = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="bg-dark-blue">
      <nav className="navbar">
        <h1 className="welcome-text">Welcome, {user?.given_name}!</h1>
      </nav>
      <div className="profile-container">
      </div>
    </div>
  );
};

export default LoggedInPage;