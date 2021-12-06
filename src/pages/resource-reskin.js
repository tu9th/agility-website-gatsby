import React, { useEffect } from 'react'
import LayoutTemplate from "../components/NewLayoutTemplate"
import NewGlobalHeader from '../components/NewGlobalHeader'
import NewGlobalFooter from '../components/NewGlobalFooter'
import SEO from '../components/SEO'
import PostItem from '../modules/PostItem'
import PostItemImageVertical from '../modules/DownloadableItem'


import './detail.scss'

/* Fake module */
import CenteredContentPanel from '../modules/CenteredContentPanel'
import { Link } from 'gatsby'

const centerContent = {
  "contentID": 2552,
  "properties": {
      "state": 2,
      "modified": "2021-08-23T12:29:45.777",
      "versionID": 32450,
      "referenceName": "newpricing_newcenteredcontenac889e",
      "definitionName": "CenteredContentPanel",
      "itemOrder": 0
  },
  "customFields": {
      "title": "Simple pricing. Powerful technology.",
      "description": "<p>We make it easy to choose the right plan for your needs.</p>",
      "section": "The Agility Resource Center"
  }
}

const ResourcesReskin = (props) => {
  var classes = 'main-content main page'
  return(
    <LayoutTemplate>
    <SEO page={{ seo: {} }} />
    <NewGlobalHeader />
    <main className={classes}>
      <CenteredContentPanel item={centerContent} />
      <div className="space-80"></div>
      <FeatureRes />
      <div className="space-80"></div>
      <FeatureCaseStudies />
      <div className="space-80"></div>
      <DownloadEbook isVerticalImage={false} />
      <div className="space-80"></div>
      <DownloadEbook isVerticalImage={true} />

    </main>
    <NewGlobalFooter />
  </LayoutTemplate>
  )
}

export default ResourcesReskin



const FeatureRes = () => {

  return (
    <section>
      <div className="container ps-rv bg">
        <div className="row">
          <div className="col col-12 col-lg-6">
            <div className="resource-lp-left ps-rv last-mb-none">
              <div className="res-pattern-logo mb-2">
                <img className="ps-as" src="./images/features/line-pattern.svg" alt="Hello"/>
                <img src="./images/features/logo-pattern.svg" alt="Hello"/>
              </div>
              <h3 className="h1">The Ultimate 50-Point Checklist for Choosing a Headless CMS</h3>
            </div>
          </div>
          <div className="col col-12 col-lg-6">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell align-middle">
                <h5>Feature resource</h5>
                <h2 className="h1">Your Ultimate 50-Point Checklist for Choosing a Headless CMS</h2>
                <p>Eum modo suas dolorum eu, nobis nostrud no has. Ne graecis detraxit molestiae pro, cu vis nonumes assueverit. Phaedrum instructior eum cu, amet definiebas vel no. </p>
                <a className="btn">Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



/*  */
const fakeCase = [
  {
    "properties": {
        "itemOrder": 8
    },
    "contentID": 3291,
    "languageCode": "en-ca",
    "customFields": {
        "excerpt": "As one of Canada's Big Five banks, Scotiabank found Agility CMS a perfect partner for fast and reliable content management.",
        "title": "Scotiabank: Delivering Exceptional and Secure Content Experience",
        "uRL": "scotiabank-delivering-exceptional-content-experience",
        "postImage": {
            "url": "https://static.agilitycms.com/case-studies/images/screenshot-2021-02-19-111358_20210219191423_0.jpg",
            "label": "Screenshot of Scotiabank Website ",
            "filesize": 229667,
            "height": 1231,
            "width": 1506
        },
        "logo": {
            "url": "https://static.agilitycms.com/logos/scotiabank_logo-registered-1_20210219173107_0.png",
            "label": "Scotiabank Logo on agilitycms.com",
            "filesize": 3886,
            "height": 39,
            "width": 272
        },
        "caseStudyIndustries_TextField": "Financial services",
        "caseStudyChallenges_TextField": "Ecommerce",
        "customerWhiteLogo": {
            "filesize": 1417,
            "height": 39,
            "label": "White Scotiabank logo on agilitycms.com",
            "pixelHeight": "39",
            "pixelWidth": "272",
            "url": "https://static.agilitycms.com/MediaGroupings/3/scotiabank_logo-registered-white.png",
            "width": 272
        },
        "isPurpleBackground": null
    },
    "url": "/resources/case-studies/scotiabank-delivering-exceptional-content-experience"
},
{
    "properties": {
        "itemOrder": 9
    },
    "contentID": 3290,
    "languageCode": "en-ca",
    "customFields": {
        "excerpt": "MEPPI adds products & industries as their business expands, while Agility CMS provides an agile and future-proof platform for content expansion. Read more!",
        "title": "Mitsubishi Electric: Driving Innovation with Digital Transformation powered by Agility CMS",
        "uRL": "mitsubishi-electric-stepping-into-digital-transformation-with-agility-cms",
        "postImage": {
            "url": "https://static.agilitycms.com/case-studies/images/meppi-electrical_20210218234706_0.jpg",
            "label": "meppi headless cms case study",
            "filesize": 50855,
            "height": 534,
            "width": 800
        },
        "logo": {
            "url": "https://static.agilitycms.com/logos/meppi-logo_20210218234842_0.jpg",
            "label": "Meppi logo",
            "filesize": 51052,
            "height": 79,
            "width": 572
        },
        "caseStudyIndustries_TextField": "Manufacturing",
        "caseStudyChallenges_TextField": "Onmichannel Content",
        "customerWhiteLogo": null,
        "isPurpleBackground": null
    },
    "url": "/resources/case-studies/mitsubishi-electric-stepping-into-digital-transformation-with-agility-cms"
},
{
    "properties": {
        "itemOrder": 10
    },
    "contentID": 925,
    "languageCode": "en-ca",
    "customFields": {
        "excerpt": "Agility CMS helps Compass Group to launch an easy multichannel ordering system for schools across Canada. Read more about it here!",
        "title": "Robust, Scalable Ecommerce: New Ordering System for Compass Group Canada",
        "uRL": "compass-group-canada",
        "postImage": {
            "url": "https://static.agilitycms.com/case-studies/images/compass_20200517041644_0.jpg",
            "label": "Ensuring students are fed with Compass Group on agilitycms.com",
            "filesize": 110159,
            "height": 788,
            "width": 940
        },
        "logo": {
            "url": "https://static.agilitycms.com/logos/800px-compass_group.svg_20190624182756_0.png",
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
}
];
const FeatureCaseStudies = () => {

  return (
    <section>
    <div className="container ps-rv bg">
      <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Featured Case Studies</h2>
        <p>Eum modo suas dolorum eu, nobis nostrud no has. Ne graecis detraxit molestiae pro, cu vis nonumes assueverit. Phaedrum instructior eum cu, amet definiebas vel no. Decore bonorum interpretaris ne vix.</p>
      </div>
      <div className="row">
        {fakeCase.map(post => {
          return (
            <div className="col-md-6 col-lg-4">
              < PostItem showCustomerLogo={true} post={post} />
            </div>
          )
        })}
      </div>
    </div>
  </section>
  )
}
const DownloadEbook = ({posts, isVerticalImage}) => {

  return (
    <section>
    <div className="container ps-rv bg">
      <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Downloadable Items</h2>
        <p>Eum modo suas dolorum eu, nobis nostrud no has. Ne graecis detraxit molestiae pro, cu vis nonumes assueverit. Phaedrum instructior eum cu, amet definiebas vel no. Decore bonorum interpretaris ne vix.</p>
      </div>
      <div className="row">
        {fakeCase.map(post => {
          return (
            <div className="col-md-6 col-lg-4">
              < PostItemImageVertical post={post} isVerticalImage= {isVerticalImage} />
            </div>
          )
        })}
      </div>
      <div className="text-center">
        <Link to="#" className="btn"><span>Browser All Downloadable items</span></Link>
      </div>
    </div>
  </section>
  )
}