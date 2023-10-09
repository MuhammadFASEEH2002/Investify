import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/reusable.css";
import "../../css/Homepage/Homepage.css";
import HomepageTitle from "./components/HomepageTitle";
import HomepageAboutus from "./components/HomepageAboutus";
import HomepageServices from "./components/HomepageServices";

const navigationButtons = [
  { id: 1, link: "#homepage-title", title: "Home" },
  { id: 2, link: "#homepage-aboutus", title: "About Us" },
  { id: 3, link: "#homepage-services", title: "Services" },
];

const Homepage = () => {
  useEffect(() => {
    document.title = "Investify | Homepage";
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="main">
        <div className="homepage-main">
          {/* Header */}
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
                    <a href={item.link}>{item.title}</a>
                  </li>
                ))}
              </ul>
              <button
                className="getstarted-button"
                onClick={() => navigate("/login/user-role")}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Title section */}
          <HomepageTitle />
          {/* Aboutus section */}
          <HomepageAboutus />
          {/* Services section */}
          <HomepageServices />
          {/* Footer */}
          <div className="homepage-footer flex flex-row align-center justify-center">
            <div className="homepage-footer-logo-section flex flex-row align-center justify-start">
              <div className="homepage-footer-logo"></div>
            </div>
            <div className="homepage-footer-text-section flex flex-column align-center justify-start">
              <h2 className="homepage-footer-text-heading">Investify</h2>
              <ul>
                {navigationButtons.map((item) => (
                  <li
                    key={item.id}
                    className="flex align-center justify-center"
                  >
                    <a href={item.link}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="homepage-footer-social-section flex flex-row align-center justify-center">
              <div className="homepage-footer-social-icons insta"></div>
              <div className="homepage-footer-social-icons fb"></div>
              <div className="homepage-footer-social-icons whatsapp"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
