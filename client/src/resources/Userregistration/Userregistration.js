import React, { useEffect, useState } from "react";
import "../../css/reusable.css";
import "../../css/Userregistration/Userregistration.css";
import { Link } from "react-router-dom";
import Investorregistration from "./components/Investorregistration";
import Investeeregistration from "./components/Investeeregistration";


const Userregistration = () => {
  const [userDecision, setUserDecision] = useState(null);
  useEffect(() => {
    const savedUserDecision = localStorage.getItem("userDecision");
    if (savedUserDecision) {
      setUserDecision(savedUserDecision);
      document.title = `Investify | ${savedUserDecision}`;
      localStorage.removeItem("userDecision");
    }
    // document.title = `Investify | ${savedUserDecision}`;
    // localStorage.removeItem("userDecision");
  },[]);

  return (
    <>
      <div className="main">
        <div className="userregistration-main">
          <div className="userregistration-header flex flex-row align-center justify-center">
            <div className="userregistration-header-logo-section flex flex-row align-center justify-start">
              <div className="userregistration-logo"></div>
            </div>
          </div>
          <div className="userregisteration-text-section">
            <h1 className="userregisteration-heading">
              CREATE YOUR INVESTOR ACCOUNT
            </h1>
            <div className="userregistration-loginmessage flex flex-row align-center justify-start">
              <h1>Already a member?</h1>
              <span>
                <Link to="/user-login">Log In</Link>
              </span>
            </div>
            {
            userDecision === "investor" ? (
            <Investorregistration />
      ): userDecision === "investee" ? (
<Investeeregistration/>
      ): (
        <p>No user decision available.</p>
      )
      }
       
            <div className="useregistration-rules-area flex flex-row align-center justify-center">
              <input
                type="checkbox"
                className="userregistration-rules-checkbox"
              />
              <h5 className="userregistration-rules-label">
                I agree to Investify terms and conditions
              </h5>
            </div>
            <div className="useregistration-registerbutton-section flex align-center justify-center">
              <button className="useregistration-registerbutton">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userregistration;
