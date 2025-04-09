import React from "react";
import signupImage from "../../assets/signup.png";
import "./SignUpWelcome.css";
import EcoBridgeLogo from "../../assets/EcoBridge.png";

const SignUpWelcome = () => {
  return (
    <>
      <div className="welcome-container">
        <img
          className="signup-image"
          src={signupImage}
          alt="Sign Up Welcome Image"
        ></img>

        <div className="logo-container">
          <img src={EcoBridgeLogo} className="flex h-14"></img>
        </div>

        <p className="introductory">
          Be part of a smart, transparent, and community-powered network where
          you can donate, request, or redistribute excess food, clothes, and
          supplies.
        </p>
      </div>
    </>
  );
};

export default SignUpWelcome;
