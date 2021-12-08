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
          thankYouContent
          resourceType {
            contentid
          }
          bookCover {
            url
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
const FeatureCaseStudies = ({topWebinar}) => {
  return (
    <section>
    <div className="container ps-rv bg">
      <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul">
        <h2>Top Webinars for You</h2>
      </div>
      <div className="row">
        {topWebinar.map(post => {
          let resType = post?.customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
          post.url = `/resources/${resType ? resType + '/' : ''}${post?.customFields?.uRL}`
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
    <>
    <div className="top-read-for-u">
      <div className="container ps-rv bg">
        <div className="top-read-line"></div>
      </div>
    </div>
    <section>
      <div className="container ps-rv bg">
        <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul">
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
  </>
  )
}

const FeatureRes = ({ eBookSelected }) => {
  const { downloadButtonText, fileDownload, image, excerpt, title, thankYouContent, bookCover} = eBookSelected?.customFields
  const urlCover = bookCover ? bookCover.url : '/images/ebook-cover-default.png'
  return (
    <section className="thanks-block">
      <div className="space-80"></div>
      <div className="container ps-rv bg">
        <div className="row">
          <div className="col col-12 col-lg-6">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell">
                { thankYouContent &&
                  <div dangerouslySetInnerHTML={renderHTML(thankYouContent)}></div>
                }
                { downloadButtonText &&
                  <a href={fileDownload?.url || '#'} className="btn btn-yellow text-uppercase">{downloadButtonText}</a>
                }
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-6 col-second">
            <div className="resource-lp-left ps-rv last-mb-none">
              <img src={urlCover} alt={title}/>
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
        <FeatureRes eBookSelected={eBookSelected} />
        <div className="space-80"></div>
        <FeatureCaseStudies topWebinar={topWebinar} />
        <div className="space-80"></div>
        <div className="space-80"></div>
        {topRead && topRead.length &&
        <>
          <DownloadEbook topReads={topRead} isVerticalImage={true} />
          <div className="space-70 space-dt-100"></div>
        </>
        }

			</section>
    }
		</>
	);
}