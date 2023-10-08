import React from 'react'

const HomepageAboutus = () => {
  return (
    <div
    className="homepage-aboutus flex flex-row align-center justify-center"
    id="homepage-aboutus"
  >
    <div className="homepage-aboutus-image-section">
      <div className="homepage-aboutus-image"></div>
    </div>
    <div className="homepage-aboutus-text-section flex flex-column align-start justify-center">
      <h1 className="homepage-aboutus-text-heading">About Us</h1>
      <p className="homepage-aboutus-text">
        Investify is an online platform that facilitates and investment
        opportunities. The platform provides a space for business owners
        looking for potential investors. Likewise, investors can search
        for businesses that match their investment criteria. Our
        platform aims to provide a seamless solution for entrepreneurs
        to list their businesses and seek investments. It will bridge
        the gap between ambitious entrepreneurs and potential investors
      </p>
    </div>
  </div>
  )
}

export default HomepageAboutus
