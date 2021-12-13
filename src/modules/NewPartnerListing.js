import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import SelectC8 from '../utils/SelectC8'
import Helpers from '../global/javascript/Helpers'
import { Link } from 'gatsby'
import { renderHTML } from '../agility/utils'
import LazyBackground from '../utils/LazyBackground'
// import { DateTime } from 'luxon'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

import './NewPartnerListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewPartnerListingQuery {
			allAgilityCustomTag(sort: {order: ASC, fields: properties___itemOrder}) {
					nodes {
					  contentID
					  languageCode
					  properties {
						referenceName
						itemOrder
					  }
					  customFields {
						title
					  }
					}
				  }
				  allAgilityPartner(sort: {order: ASC, fields: properties___itemOrder}) {
				  nodes {
					contentID
					languageCode
					properties {
					referenceName
					  itemOrder
					}
					customTags {
						contentID
					}
					customFields {
					  excerpt
					  image:partnerLogo {
						url
						label
					  }
					  customTags {
						referencename
					  }
					  title
					  uRL
					}
				  }
				}
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			let resources = queryData.allAgilityPartner.nodes
			const resourceType = queryData.allAgilityCustomTag.nodes
			const viewModel = {
				item: props.item,
				resources,
				resourceType,
				numberItemPerPage: 12
			}
			return (<NewPartnerListing {...viewModel}/>);
		}}
	/>
)

const PostItem = ({ thumbUrl, link, title, excerpt }) => {
  const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}
	return (
		<>
      <div className="case-box h-100 transition-25 ps-rv d-flex flex-column">
        <div className="case-thumb ps-rv overflow-hidden">
          {thumbUrl && <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>}
        </div>
        <div className="case-content d-flex flex-column small-paragraph flex">
          <div className="flex-0-0">
            <h3>{title}</h3>
          </div>
          <div className="flex">
            <p>{trimText(excerpt)}</p>
          </div>
          {link &&
            <Link to={link} className="link-line link-purple">Read More</Link>
          }
        </div>
        <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
      </div>
		</>
	)
}

const PostResult = ({posts, loadMoreIdx}) => {
	if (posts.length) {
		const postResults = posts.filter((item, index) => index < loadMoreIdx).map((post, index) => {
			const thumbUrl = post?.customFields?.image?.url
			let resType = post?.customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
			const link = `/partners/implementation/${post?.customFields?.uRL}`
			const title = post?.customFields?.title
			const excerpt = post?.customFields?.excerpt
			return <div className="col-12 col-md-6 col-lg-4 post-item" key={`post-${post.contentID}`}>
			<div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
				<PostItem thumbUrl={thumbUrl} link={link} title={title} excerpt={excerpt} />
			</div>
		</div>
		})
		return (<>{postResults}</>)
	}
	return (
		<h3 className="text-center col-12">There are no partner in this type. Please check back later.</h3>
	)
}

const NewPartnerListing = ({item, resources, resourceType, numberItemPerPage}) => {
	const [loadMoreIdx, setLoadMoreIdx] = useState( numberItemPerPage ? Number(numberItemPerPage) : 12)
	const tmpPostOptions = {
		name: 'partner-tag',
		options: { ...resourceType.reduce((obj, node) => {
			obj[node.contentID] = node.customFields.title
			return obj
		}, {}), 1: 'All Partners' },
		selectedOption: [1]
	}
	const [postOpts, setPostOpts] = useState(tmpPostOptions)
	const [postRender, setPostRender] = useState(resources)

	const onChangeFilter = ({ name, value }) => {
		if (value.includes(1)) {
			setPostRender(resources)
			setPostOpts({...tmpPostOptions, selectedOption: [1]})
		} else {
			const detailCategory = resourceType.find((node) => {
				return value.includes(node.contentID)
			})
			const newResoucesFilter = resources.filter(res => {
        const mapContentId = res.customTags?.map(tag => tag.contentID) || []
				return value.some(val => mapContentId.includes(val))
			})
			setPostRender(newResoucesFilter)
			setPostOpts({...tmpPostOptions, selectedOption: value})
		}
		setLoadMoreIdx(numberItemPerPage ? Number(numberItemPerPage) : 12)
	}

	const loadMoreHandler = () => {
		let tmpLoadMoreIdx = loadMoreIdx
		tmpLoadMoreIdx += 12
		setLoadMoreIdx(tmpLoadMoreIdx)
	}

	// as componentDidMount
	useEffect (() => {
		setTimeout(() => {
			const hideModules = document.querySelectorAll('.blog-listing, .info-box, .stay-in-touch-box, .most-viewed-articles')
			hideModules.forEach(mod => {
				mod.style.display = 'none'
			})
		}, 1000)
	}, [])

	return (
		<>
			<section className="mod-new-post-listing mod-integration-listing new-partner-list">
				<div className="container">
					<div className="filter-wrap small-paragraph case-filter-box">
						<SelectC8 className="d-inline-block" data={postOpts} onChange={onChangeFilter} />
					</div>

					<div className="row">
						<PostResult posts={postRender} loadMoreIdx={loadMoreIdx} />
					</div>

					{loadMoreIdx <= postRender.length - 1 && <div className="text-center mt-35">
					<a className="btn btn-load-more mb-0" onClick={loadMoreHandler}>
						<span>Load More</span>
					</a>
				</div>}
				</div>
				<div className="space-60 space-dt-90"></div>
			</section>
			<Spacing item={item}/>
		</>
	);
}