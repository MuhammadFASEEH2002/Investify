import React, { useEffect } from "react";
import "../../css/reusable.css";
import "../../css/Userrole/Userrole.css";

const Userrole = () => {
  useEffect(() => {
    document.title = "Investify | User-Role";
  });
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
          <div className="userrole-decsionbutton-section flex align-center justify-even">
            <div
              className="userrole-decisionbutton flex flex-column align-center justify-center"
              style={{}}
            >
              <h1 className="userrole-decisionbutton-heading">
                I Want to Invest
              </h1>
              <h3 className="userrole-decisionbutton-text">
                Join our network as an investor, explore promising businesses,
                and start making strategic investments.
              </h3>
            </div>
            <div className="userrole-decisionbutton flex flex-column align-center justify-center" style={{}}>
            <h1 className="userrole-decisionbutton-heading">
            I Want to List My Business              </h1>
              <h3 className="userrole-decisionbutton-text">
              Showcase your business, attract potential investors, and take the next step towards growth.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userrole;
