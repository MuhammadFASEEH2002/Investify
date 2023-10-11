import React from "react";

const DecisionButton = ({ heading, text, onClick }) => {
  return (
    <>
      <div  onClick={onClick} className="userrole-decisionbutton flex flex-column align-center justify-center">
        <h1 className="userrole-decisionbutton-heading">{heading}</h1>
        <h3 className="userrole-decisionbutton-text">{text}</h3>
      </div>
    </>
  );
};

export default DecisionButton;
