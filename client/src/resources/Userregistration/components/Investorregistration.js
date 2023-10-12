import React from "react";

const Investorregistration = () => {
  return (
    <>
      <div className="userregistration-form">
        <div className="userregistration-form-left flex flex-column align-center justify-center">
          <div className="userregistration-inputarea flex flex-row align-center justify-start">
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">First Name</h5>
              <input
                type="text"
                className="userregistration-inputarea-inputboxes"
              />
            </div>
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Last Name</h5>
              <input
                type="text"
                className=" userregistration-inputarea-inputboxes"
              />
            </div>
          </div>
          <div className="userregistration-inputarea flex flex-row align-center justify-start">
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Email</h5>
              <input
                type="email"
                className="userregistration-inputarea-inputboxes"
              />
            </div>
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">CNIC</h5>
              <input
                type="number"
                className=" userregistration-inputarea-inputboxes"
              />
            </div>
          </div>
          <div className="userregistration-inputarea flex flex-row align-center justify-start">
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Password</h5>
              <input
                type="password"
                className="userregistration-inputarea-inputboxes"
              />
            </div>
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Confirm Password</h5>
              <input
                type="password"
                className=" userregistration-inputarea-inputboxes"
              />
            </div>
          </div>
        </div>
       
        <div className="userregistration-form-right"></div>
      </div>
    </>
  );
};

export default Investorregistration;
