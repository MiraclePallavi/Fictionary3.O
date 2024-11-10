import React, { useState } from "react";
import "./Home.css";
import cityscape from "/assets/cityscape.png";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //saving user data here from g-auth
  //and navigating to logged-in page
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log("Login Success:", decoded);

    // Save user data
    setUser(decoded);
    // Redirect to logged-in page
    navigate("/loggedin-page", { state: { user: decoded } });
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div
      className="bg-dark-blue min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${cityscape})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-grow flex flex-col items-center justify-center z-10">
        <h1 className="text-neon-pink text-8xl font-pixel flicker">FICTIONARY</h1>

        {/* Google Login Button */}
        <div className="mt-8">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
