import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery, Link } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import { renderHTML } from '../agility/utils'
import LazyBackground from '../utils/LazyBackground'
// import { DateTime } from 'luxon'
import PostItem from '../modules/PostItem'
import PostItemImageVertical from '../modules/DownloadableItem'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

import './NewEBookThankYou.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewEBookThankYouQuery {
			allAgilityResource(sort: {fields: customFields___date, order: DESC}) {
				nodes {
          customFields {
          image {
            url
            width
            height
            label
          }
          resourceType {
            contentid
          }
          date(formatString: "MMMM D, YYYY")
          title
          uRL
          resourceTypeID
          resourceTypeName
          resourceTopics {
            referencename
            sortids
          }
          topReads {
            referencename
          }
          topWebinars {
            referencename
          }
          resourceTopics_TextField
          resourceTopics_ValueField
          topReads_ValueField
          topReads_TextField
          topWebinars_TextField
          topWebinars_ValueField
          excerpt
          cTA {
            contentid
          }
          fileDownload {
            url
            label
            filesize
          }
          downloadButtonText
        }
        contentID
				}
			}
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			let resources = queryData.allAgilityResource.nodes
			const viewModel = {
				item: props.item,
				resources,
			}
			return (<NewEBookThankYou {...viewModel}/>);
		}}
	/>
)

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
const FeatureCaseStudies = ({topWebinar}) => {
  return (
    <section>
    <div className="container ps-rv bg">
      <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Top Webinars for You</h2>
      </div>
      <div className="row">
        {topWebinar.map(post => {
          return (
            <div className="col-md-6 col-lg-4">
              <PostItem showCustomerLogo={true} post={post} hideDescription={true} />
            </div>
          )
        })}
      </div>
    </div>
  </section>
  )
}
const DownloadEbook = ({topReads, isVerticalImage}) => {
  return (
    <section>
    <div className="container ps-rv bg">
      <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Top Reads For You</h2>
      </div>
      <div className="row">
        {topReads.map(post => {
          return (
            <div className="col-md-6 col-lg-4">
              < PostItemImageVertical post={post} isVerticalImage= {isVerticalImage} />
            </div>
          )
        })}
      </div>
      {/* <div className="text-center">
        <Link to="#" className="btn"><span>Browser All Downloadable items</span></Link>
      </div> */}
    </div>
  </section>
  )
}

const FeatureRes = ({ eBookSelected }) => {
  const { downloadButtonText, fileDownload, image, excerpt, title} = eBookSelected?.customFields
  return (
    <section className="thanks-block">
      <div className="container ps-rv bg">
        <div className="row">
          <div className="col col-12 col-lg-6">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell">
                { title &&
                  <h2 className="h1">{title}</h2>
                }
                { fileDownload && fileDownload?.url &&
                  <a href={fileDownload?.url || '#'} download>Click Download here to access the Ebook!</a>
                }
                { excerpt &&
                  <p>{excerpt}</p>
                }
                { downloadButtonText &&
                  <a href={fileDownload?.url || '#'} className="btn btn-yellow">{downloadButtonText}</a>
                }
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-6">
            <div className="resource-lp-left ps-rv last-mb-none">
              { image &&
                <img src={image.url || "./images/features/logo-pattern.svg"} alt="Hello"/>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const NewEBookThankYou = ({ item, resources }) => {
  const [eBookSelected, setEBookSelected] = useState(null)
  const [topWebinar, setTopWebinar] = useState(null)
  const [topRead, setTopRead] = useState(null)

  const handleGetTopWebinars = (topWebinarIds) => {
    let results = []
    if (topWebinarIds?.length) {
      const formatTopWebinarIds = topWebinarIds.map(id => Number(id))
      results = resources.filter(res => {
        return formatTopWebinarIds.includes(res.contentID)
      })
    }
    if(results.length < 3) {
      let count = results.length
      for(let i = 0; i < resources.length; i++) {
        if (count < 3) {
          results.push(resources[0])
          count++
        }
        if (count === 3) {
          break;
        }
      }
    }
    return results
  }

  const handleGetTopReads = (topReadIds) => {
    let results = []
    if (topReadIds?.length) {
      const formatTopReadIds = topReadIds.map(id => Number(id))
      results = resources.filter(res => {
        return formatTopReadIds.includes(res.contentID)
      })
    }
    if(results.length < 3) {
      let count = results.length
      for(let i = 0; i < resources.length; i++) {
        if (count < 3) {
          results.push(resources[0])
          count++
        }
        if (count === 3) {
          break;
        }
      }
    }
    return results
  }
  useEffect(() => {
    const pathName = window.location.pathname
    const urlEBook = pathName.substring(pathName.indexOf('/ebook/') + 7, pathName.indexOf('/thank-you'))
    const eBookFinded = resources.find(res => res.customFields?.uRL === urlEBook)
    const topWebinarIds = eBookFinded?.customFields?.topWebinars_ValueField?.split(',')
    const topReadIds = eBookFinded?.customFields?.topReads_ValueField?.split(',')
    setTopWebinar(handleGetTopWebinars(topWebinarIds))
    setTopRead(handleGetTopReads(topReadIds))
    console.log('eBookFinded', eBookFinded)
    setEBookSelected(eBookFinded)
  }, [])
	return (
		<>
    { eBookSelected &&
			<section className="mod-new-post-listing">
        <div className="space-80"></div>
        <FeatureRes eBookSelected={eBookSelected} />
        <div className="space-80"></div>
        <FeatureCaseStudies topWebinar={topWebinar} />
        <div className="space-80"></div>
        <div className="space-80"></div>
        <DownloadEbook topReads={topRead} isVerticalImage={true} />
        <div className="space-80"></div>
			</section>
    }
		</>
	);
}