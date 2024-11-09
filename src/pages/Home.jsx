import React from "react";
import "./Home.css"; // for custom pixel and animation styles
import cityscape from "/assets/cityscape.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const handleLoginSuccess = (credentialResponse) => {
   
    console.log("Login Success:", credentialResponse);
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded)
    // Handle successful login here (e.g., send credentialResponse to backend)
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
