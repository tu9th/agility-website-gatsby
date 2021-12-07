import React, { useEffect } from 'react'
import LayoutTemplate from "../components/NewLayoutTemplate"
import NewGlobalHeader from '../components/NewGlobalHeader'
import NewGlobalFooter from '../components/NewGlobalFooter'
import SEO from '../components/SEO'
import PostItem from '../modules/PostItem'
import PostItemImageVertical from '../modules/DownloadableItem'


import './detail.scss'

import LazyBackground from '../utils/LazyBackground'
/* Form */
/* Form */
import FullPageForm from '../components/full-page-form'
import FormField from '../components/_form-field.jsx'
import Form from '../components/_form.jsx'

/* Fake module */
import CenteredContentPanel from '../modules/CenteredContentPanel'
import { Link } from 'gatsby'

const ResourceDetail = () => {
  var classes = 'main-content main page'
  return(
    <LayoutTemplate>
    <SEO page={{ seo: {} }} />
    <NewGlobalHeader />
    <main className={classes}>
      <div>
        <h1>Hello</h1>
      </div>
      <div className="space-80"></div>
      <DownloadEbook isVerticalImage={true} />
      <div className="space-80"></div>
      <Detail />
      <div className="space-80"></div>
    </main>
    <NewGlobalFooter />
  </LayoutTemplate>
  )
}

export default ResourceDetail





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
            <div key={post.id} className="col-md-6 col-lg-4">
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


/* ____________________________________ */
/* ____________________________________ */
/* ____________________________________ */



const tags = [
  {
      "contentID": 3842,
      "properties": {
          "state": 2,
          "modified": "2021-08-26T14:37:20.313",
          "versionID": 32511,
          "referenceName": "casestudyindustries",
          "definitionName": "CaseStudyIndustry",
          "itemOrder": 2
      },
      "customFields": {
          "title": "Manufacturing"
      }
  }
];



const renderTags = (tags, type) => {
  console.log(tags);
  return tags.map((tag, index) => {
    let link = `/resources/case-studies/?${type}=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
    return (
      <span key={index} className="d-inline-block cs-tag ps-rv">
        {tag?.customFields?.title}
        <Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
      </span>
    )
  })
}

const Detail = () => {

  return (
    <section className="new-resource-detail">
      <div className="container">
        <div className="d-flex flex-wrap">
          <div className="cs-detail-cont-left content-ul beauty-ul">
            <div className="cs-detail-inner last-mb-none">
              <h1>Title</h1>
              <p>A subtitle field could go here, just like in the blog page designs.</p>
             {/* Yellow box */}
             <div className="resource-lp-left ps-rv last-mb-none">
              <div className="res-pattern-logo mb-2">
                <img className="ps-as" src="./images/features/line-pattern.svg" alt="Hello"/>
                <img src="./images/features/logo-pattern.svg" alt="Hello"/>
              </div>
              <h3 className="h1">The Ultimate 50-Point Checklist for Choosing a Headless CMS</h3>
            </div>
             {/*  */}

              <p>Maiorum molestiae incorrupte an mel, nostrud moderatius est eu. Vel no accusamus assentior. In decore qualisque per, diam numquam vivendum cum ne, atqui dicam reprehendunt has cu. Eam ut epicurei verterem, ut fastidii prodesset vel. Ex nam omnis oportere, dictas latine abhorreant pri te. Ex sea vitae nonumy splendide. At per purto virtute cotidieque, putant doctus no est.

              Maiorum molestiae incorrupte an mel, nostrud moderatius est eu. Vel no accusamus assentior. In decore qualisque per, diam numquam vivendum cum ne, atqui dicam reprehendunt has cu. Eam ut epicurei verterem, ut fastidii prodesset vel. Ex nam omnis oportere, dictas latine abhorreant pri te. Ex sea vitae nonumy splendide. At per purto virtute cotidieque, putant doctus no est.</p>
            </div>
          </div>
          {/*  */}
          <div className="cs-detail-cont-right">
            <div className="small-paragraph cs-tag-wrap last-mb-none">
              <h4>Industries</h4>
              <p>
                {renderTags(tags, 'industry')}
              </p>
            </div>

            {/*  */}
            <GetResourceForm />
            {/* recommend webinar */}
            <RecommendWebinar />
            <div className="space-80"></div>
            <CTA />
            
          </div>
        </div>
      </div>
    </section>
  )
}


const RecommendWebinar = () => {

  return (
    <div>
      <h3 className="h2">Recommended Webinars</h3>
      <LazyBackground className="re-webina-thumb bg" src="https://static.agilitycms.com/case-studies/images/visit-orlando-2_20200516204137_0.jpg?w=800&q=60" />
      <div className="content-blog">
        <p>
          {renderTags(tags, 'industry')}
        </p>
        <h3>Building an Ecommerce Website with Agility</h3>
        <Link to="#" className="link-line link-purple">Watch Now</Link>
      </div>
    </div>
  )
}

const CTA = () => {

  return (
    <div className="learn-more-cta bg-58 text-white">
      <div className="d-table w-100">
        <div className="d-table-cell align-middle text-center small-paragraph last-mb-none">
         <h3 className="">Recommended Webinars</h3>
         <p>Nec nostrud intellegam no, tale diceret dignissim pro ei.</p>
         <Link to="#" className="btn btn-light mb-0">Watch Now</Link>
        </div>
      </div>
    </div>
  )
}

const GetResourceForm = () => {

  const firstNameLabel =  'First Name'
	const lastNameLabel =  'Last Name'
	const emailLabel =  'Email'
	const phoneLabel =  'Phone'
	const companyLabel =  'Company'

  return (
    <Form postURL="/hello">
      
      <FormField id="firstname" label={ firstNameLabel }>
				<input id="firstname" className="changed" type="text" placeholder={ firstNameLabel } required />
			</FormField>
			<FormField id="lastname" label={ lastNameLabel }>
				<input id="lastname" className="changed" type="text" placeholder={ lastNameLabel } required />
			</FormField>
			<FormField id="company" label={ companyLabel }>
				<input id="company" className="changed" type="text" placeholder={ companyLabel } required />
			</FormField>
			<FormField id="email" label={ emailLabel }>
				<input id="email" className="changed" type="email" placeholder={ emailLabel } required />
			</FormField>
			<FormField id="phonenumber" label={ phoneLabel }>
				<input id="phonenumber" className="changed" type="tel" placeholder={ phoneLabel } minLength="9" maxLength="20" message="Please enter your phone number." required />
			</FormField>

    </Form>
  )
}
