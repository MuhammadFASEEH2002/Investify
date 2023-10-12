import React from "react";
import "../../css/reusable.css";
import "../../css/Userregistration/Userregistration.css";
import { Link } from "react-router-dom";
import Investorregistration from "./components/Investorregistration";


const Userregistration = () => {
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
            <div className="userregistration-loginmessage flex flex-row align-center jsutify-start">
                <h1>Already a member?</h1>
                <span><Link to="/user-login">Log In</Link>
                </span>
            </div>
            <Investorregistration/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userregistration;
