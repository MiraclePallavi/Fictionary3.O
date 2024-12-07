import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "./Login.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setMessage("Fetching your information from Google...");
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
        .then((response) => response.json())
        .then((userInfo) => {
          setMessage("Welcome, " + userInfo.name);
          setUser(userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo)); 
          localStorage.setItem("access_token", tokenResponse.access_token);
        })
        .catch((error) => {
          setMessage("Failed to fetch user information");
          console.error(error);
        });
    },
    onFailure: (error) => {
      setMessage("Login failed. Please try again.");
      console.error(error);
    },
  });

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setMessage("Welcome back, " + JSON.parse(storedUser).name);
    } else {
      setMessage("Please log in to continue.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setMessage("You have been logged out.");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div className="login-message">{message}</div>
        {!user ? (
          <button className="login-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        ) : (
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
