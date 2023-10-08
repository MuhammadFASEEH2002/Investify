import React from 'react'

const HomepageServices = () => {
  return (
    <div
            className="homepage-services flex flex-row align-center justify-center"
            id="homepage-services"
          >
            <div className="homepage-services-text-section flex flex-column align-start justify-center">
              <h1 className="homepage-services-text-heading">Services</h1>
              <p className="homepage-services-text">
                The main objective of our platform is to support new startups
                and small-scale businesses by connecting them with the right
                investors to solve their problems related to funding.
              </p>
            </div>
            <div className="homepage-services-image-section flex align-center justify-end">
              <div className="homepage-services-image"></div>
            </div>
          </div>
  )
}

export default HomepageServices