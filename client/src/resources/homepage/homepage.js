import React from "react";
import "../../css/style.css";

const navigationButtons = [
  { id: 1, title: "Home" },
  { id: 2, title: "About us" },
  { id: 3, title: "Services" },
];
const homepage = () => {
  return (
    <>
      <div className="main">
        <div className="homepage-main">
          <div className="homepage-header flex flex-row align-center justify-center">
            <div className="homepage-header-logo-section flex flex-row align-center justify-start">
              <div className="homepage-logo"></div>
            </div>
            <div className="homepage-header-navigationButtons-section flex flex-row align-center justify-center ">
              <ul className="flex flex-row align-center justify-center">
                {navigationButtons.map((item) => (
                  <li
                    key={item.id}
                    className="flex align-center justify-center"
                  >
                    <a href={item.id}>{item.title}</a>
                  </li>
                ))}
              </ul>
              <button className="getstarted-button">Get Started</button>
            </div>
          </div>
          <div className="homepage-title"></div>
          <div className="homepage-aboutus"></div>
          <div className="homepage-services"></div>
          <div className="homepage-footer"></div>
        </div>
      </div>
    </>
  );
};

export default homepage;
