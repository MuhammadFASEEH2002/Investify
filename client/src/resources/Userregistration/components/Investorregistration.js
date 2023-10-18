import React, { useState } from "react";
import Select from "react-select";
import "../../../css/reusable.css";
import "../../../css/Userregistration/Userregistration.css";

const cityOptions = [
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "islamabad", label: "Islamabad" },
];

const countryOptions = [
  { value: "pak", label: "Pakistan" },
];

const Investorregistration = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      <div className="userregistration-form flex flex-row align-start justify-center">
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
                placeholder="e.g "
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
              <h5 className="userregistration-inputfields-label">
                Confirm Password
              </h5>
              <input
                type="password"
                className=" userregistration-inputarea-inputboxes"
              />
            </div>
          </div>
        </div>

        <div className="userregistration-form-right flex flex-column align-center justify-center">
          <div className="userregistration-inputarea flex flex-row align-center justify-start">
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Phone</h5>
              <input
                type="number"
                className="userregistration-inputarea-inputboxes"
              />
            </div>
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">
                Date of Birth
              </h5>
              <input
                type="date"
                className=" userregistration-inputarea-inputboxes"
              />
            </div>
          </div>
          <div className="userregistration-inputarea flex flex-row align-center justify-start">
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">City</h5>
              {/* <input
                type="email"
                className="userregistration-inputarea-inputboxes"
              /> */}
              <Select
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
                // className="userregistration-inputarea-inputboxes"
              />
            </div>
            <div className="userregistration-inputfields flex flex-column">
              <h5 className="userregistration-inputfields-label">Country</h5>
              {/* <input
                type="number"
                className=" userregistration-inputarea-inputboxes"
              /> */}
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Investorregistration;
