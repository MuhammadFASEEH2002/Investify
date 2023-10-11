import React, { useState } from "react";
import "../../css/reusable.css";
import "../../css/Userlogin/Userlogin.css";

const Userlogin = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.value);
  };
  return (
    <>
      <div className="main">
        <div className="userlogin-main">
          <div className="userlogin-header flex flex-row align-center justify-center">
            <div className="userlogin-header-logo-section flex flex-row align-center justify-start">
              <div className="userlogin-logo"></div>
            </div>
          </div>
          <div className="userlogin-loginarea flex flex-row align-center justify-center">
            <div className="userlogin-loginarea-left flex flex-column align-center justify-center">
              <h1 className="userlogin-loginarea-left-text">
                Login to Your Account
              </h1>
              <form
                action=""
                className="userlogin-loginarea-left-loginform flex flex-column align-start justify-center"
              >
                <div className="userlogin-loginarea-left-loginform-inputarea flex flex-row align-center justify-start">
                  <div className="userlogin-loginarea-left-loginform-inputarearadio flex flex-row">
                    <input
                      type="radio"
                      name="role"
                      value="investor"
                      className="userlogin-checkbox"
                      checked={selectedRole === "investor"}
                      onChange={handleRadioChange}
                    />
                    <h5>Investor</h5>
                  </div>
                  <div className="userlogin-loginarea-left-loginform-inputarearadio flex flex-row">
                    <input
                      type="radio"
                      name="role"
                      value="investee"
                      className="userlogin-checkbox"
                      checked={selectedRole === "investor"}
                      onChange={handleRadioChange}
                    />
                    <h5>Investee</h5>
                  </div>
                </div>

                <div className="userlogin-loginarea-left-loginform-inputarea">
                  <h5>Email</h5>
                  <input
                    type="email"
                    className=" userlogin-loginarea-left-loginform-inputarea-inputboxes"
                  />
                </div>
                <div className="userlogin-loginarea-left-loginform-inputarea">
                  <h5>Password</h5>
                  <input
                    type="password"
                    className="userlogin-loginarea-left-loginform-inputarea-inputboxes"
                  />
                </div>
                <div className="userlogin-loginarea-left-loginform-inputarea flex justify-end">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="userlogin-loginarea-left-loginform-submitarea flex align-center justify-center">
                  <input
                    type="submit"
                    value="Login"
                    className="userlogin-loginform-submitbutton"
                  />
                </div>
              </form>
            </div>
            <div className="userlogin-loginarea-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlogin;
