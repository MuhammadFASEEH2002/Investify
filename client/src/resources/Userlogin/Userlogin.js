import React, { useEffect, useState } from "react";
import "../../css/reusable.css";
import "../../css/Userlogin/Userlogin.css";
import { useNavigate } from "react-router-dom";


const Userlogin = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Investify | UserLogin";
  });
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
                      className="userlogin-radio"
                      checked={selectedRole === "investor"}
                      onChange={handleRadioChange}
                    />
                    <h5 className="userlogin-inputfields-label">Investor</h5>
                  </div>
                  <div className="userlogin-loginarea-left-loginform-inputarearadio flex flex-row">
                    <input
                      type="radio"
                      name="role"
                      value="investee"
                      className="userlogin-radio"
                      checked={selectedRole === "investee"}
                      onChange={handleRadioChange}
                    />
                    <h5 className="userlogin-inputfields-label">Investee</h5>
                  </div>
                </div>

                <div className="userlogin-loginarea-left-loginform-inputarea">
                  <h5 className="userlogin-inputfields-label">Email</h5>
                  <input
                    type="email"
                    className=" userlogin-loginarea-left-loginform-inputarea-inputboxes"
                  />
                </div>
                <div className="userlogin-loginarea-left-loginform-inputarea">
                  <h5 className="userlogin-inputfields-label">Password</h5>
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
                    value="Sign In"
                    className="userlogin-loginform-submitbutton"
                  />
                </div>
              </form>
              <div className="userlogin-dropdownbutton">

              </div>
            </div>
            <div className="userlogin-loginarea-right flex flex-column align-center justify-center">
              <div className="userlogin-loginarea-right-content flex flex-column align-center justify-center">
                <h1 className="userlogin-loginarea-right-content-heading">
                  New Here?
                </h1>
                <h3 className="userlogin-loginarea-right-content-text">
                  Sign Up and unlock the potential of your financial future –
                  Join our business investment platform today and start building
                  wealth!
                </h3>
                <button
                  className="userlogin-loginarea-right-signupbutton"
                  onClick={() => navigate("/user-registration/user-role")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlogin;
