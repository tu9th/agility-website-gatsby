import React, { useEffect, useRef, useState } from 'react';
import './NewPartnerListingModule.scss'
import './CaseStudyReskin.scss'
import PostItem from './PostItem'

const IntergrationListing = () => {
  const classSection = 'module mod-integration-listing'
  let listIntegration = []

  for (let index = 0; index < 3; index++) {
    listIntegration = [...listIntegration, {
      "properties": {
        "itemOrder": 10
      },
      "contentID": 925,
      "languageCode": "en-ca",
      "customFields": {
        "excerpt": "A product description would go here, keep it short and sweet, three lines of text or less. Lorem ipsum dolor amet.",
        "title": "Product Name",
        "uRL": "compass-group-canada",
        "postImage": {
          "url": "https://static.agilitycms.com/partners/integrations/aws-logo-500.png?w=480&amp;h=277",
          "label": "Ensuring students are fed with Compass Group on agilitycms.com",
          "filesize": 110159,
          "height": 788,
          "width": 940
        },
        "logo": {
          "url": "https://static.agilitycms.com/partners/integrations/aws-logo-500.png?w=480&amp;h=277",
          "label": "Compass-Group-Canada Logo on agilitycms.com",
          "filesize": 28318,
          "height": 314,
          "width": 800
        },
        "caseStudyIndustries_TextField": null,
        "caseStudyChallenges_TextField": "Onmichannel Content,Ecommerce",
        "customerWhiteLogo": {
          "filesize": 9083,
          "height": 314,
          "label": "Compass-Group-Canada White Logo on agilitycms.com",
          "pixelHeight": "314",
          "pixelWidth": "800",
          "url": "https://static.agilitycms.com/MediaGroupings/3/compass_white-logo.png",
          "width": 800
        },
        "isPurpleBackground": null
      },
      "url": "/resources/case-studies/compass-group-canada"
    }]
  }

  return <React.Fragment>
    <section className={classSection}>
      <div className="container">
        <div className="text-center">
          <h2>Similar Integrations</h2>
        </div>

        <div className="row listing-wrap">
          {listIntegration.map((post, index) => {
            return <div key={index} className="col-md-6 col-xl-4 case-col">
              < PostItem post={post} isIntegration={true} />
            </div>
          })}
        </div>

        <div className="text-center">
          <a className="btn btn-explore-all-integration" href="https://www.google.com/">
            <span>Explore All Integrations</span>
          </a>
        </div>
      </div>
    </section>
  </React.Fragment>
}
export default IntergrationListing