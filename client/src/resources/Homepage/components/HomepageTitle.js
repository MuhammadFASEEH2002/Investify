import React from 'react'

const HomepageTitle = () => {
  return (
    <div
    className="homepage-title flex flex-row align-center justify-center"
    id="homepage-title"
  >
    <div className="homepage-title-image-section">
      <div className="homepage-title-image"></div>
    </div>
    <div className="homepage-title-text-section flex flex-column align-center justify-center">
      <h1 className="homepage-title-text">INVESTIFY</h1>
      <h1 className="homepage-title-subtext">
        Your Gateway to Business Investment Opportunities
      </h1>
    </div>
 
  </div>
  )
}

export default HomepageTitle