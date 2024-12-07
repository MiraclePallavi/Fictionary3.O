import React from "react";
import { GoogleLogin } from "@react-oauth/google"; 
import {jwtDecode} from "jwt-decode";

const GoogleAuth = ({ onLoginSuccess, onLoginFailure, onLogout, isLoggedIn }) => {
  const handleLoginSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
    onLoginSuccess(decoded);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={onLogout} className="text-2xl text-pink-500">
          Sign Out
        </button>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={onLoginFailure}
          theme="outline"
        />
      )}
    </div>
  );
};

export default GoogleAuth;
