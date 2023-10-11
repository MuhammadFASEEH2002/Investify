import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/reusable.css";
import "../../css/Userrole/Userrole.css";
import DecisionButton from "./components/DecisionButton";

const Userrole = () => {
  useEffect(() => {
    document.title = "Investify | User-Role";
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="main">
        <div className="userrole-main">
          <div className="userrole-header flex flex-row align-center justify-center">
            <div className="userrole-header-logo-section flex flex-row align-center justify-start">
              <div className="userrole-logo"></div>
            </div>
          </div>
          <div className="userrole-text-section flex align-center justify-center">
            <h1 className="userrole-text">
              Welcome to Investify – Your Gateway to Business Investment
              Opportunities.
            </h1>
          </div>
          <div className="userrole-decsionbutton-section flex flex-row align-center justify-even">
            <DecisionButton
              heading="I Want to Invest"
              text="Join our network as an investor, explore promising businesses, and start making strategic investments."
              onClick={() => navigate("/login/investor-login")}
            />
            <DecisionButton
              heading="I Want to List My Business"
              text="Showcase your business, attract potential investors, and take the next step towards growth."
              onClick={() => navigate("/login/investee-login")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userrole;
