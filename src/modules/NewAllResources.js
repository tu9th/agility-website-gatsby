import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import SelectC8 from '../utils/SelectC8'
import Helpers from '../global/javascript/Helpers'
import { Link } from 'gatsby'
import LazyBackground from '../utils/LazyBackground'
// import { DateTime } from 'luxon'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

import './NewAllResources.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewResourcesListingQuery {
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
					}
				}
			}
			allAgilityResourceType {
				nodes {
					customFields {
						title
					}
					id
					contentID
				}
			}
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			console.log('props', props)
			let resources = queryData.allAgilityResource.nodes;
			let {content, numberItemPerPage} = props.item?.customFields
			const allAgilityResourceType = queryData.allAgilityResourceType.nodes
			const [loadMoreIdx, setLoadMoreIdx] = useState( numberItemPerPage ? Number(numberItemPerPage) : 12)

			resources.forEach(p => {
				p.url = "/resources/posts/" + p.customFields.uRL;
			});

			const tmpPostOptions = {
				name: 'posts',
				options: { ...allAgilityResourceType.reduce((obj, node) => {
					obj[node.contentID] = node.customFields.title
					return obj
				}, {}), 1: 'Asset Category' },
				selectedOption: [1]
			}

			const [postOpts, setPostOpts] = useState(tmpPostOptions)
			const [postRender, setPostRender] = useState(resources)

			//filter by tag if neccessary

			const loadMoreHandler = () => {
				let tmpLoadMoreIdx = loadMoreIdx
				tmpLoadMoreIdx += 12
				setLoadMoreIdx(tmpLoadMoreIdx)
			}

			useEffect (() => {
				setTimeout(() => {
					const hideModules = document.querySelectorAll('.blog-listing, .info-box, .stay-in-touch-box, .most-viewed-articles')
					hideModules.forEach(mod => {
						mod.style.display = 'none'
					})
				}, 1000)
			}, [])

			const onChangeFilter = ({ name, value }) => {
				let url = ''
				if (value.includes(1)) {
					setPostRender(resources)
					url = '/resources/posts'
				} else {
					const detailCategory = queryData.allAgilityResourceType.nodes.find((node) => {
						console.log(value, node.contentID)
						return value.includes(node.contentID)
					})
					if (detailCategory) {
						url = `/resources/posts/tag/${encodeURIComponent(detailCategory.customFields.title.toLowerCase().replace(/ /g, "-"))}`
					}
				}
				window.location.href = url
			}

			return (
				<>
					<section className="mod-new-post-listing">
						<div className="container">
							<div className="filter-wrap small-paragraph case-filter-box">
								<SelectC8 className="d-inline-block" data={postOpts} onChange={onChangeFilter} />
							</div>

							<div className="row">
								{postRender.length === 0 && <h3 className="text-center col-12">There are no post in this category. Please check back later.</h3>}
								{postRender.length > 0 && postRender.filter((item, index) => index < loadMoreIdx).map(post => {
									const thumbUrl = post?.customFields?.image?.url
									const link = post?.customFields?.uRL
									const title = post?.customFields?.title
									const trimText = (text) => {
										let txt = text.split(' ')
										return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
									}
									let categories = []
									return  <div className="col-12 col-md-6 col-lg-4 post-item" key={`post-${post.contentID}`}>
										<div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
											<div className="case-thumb ps-rv overflow-hidden bg-c9-o25">
												{thumbUrl && <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />}
												{!thumbUrl && <Lazyload offset={Helpers.lazyOffset}><img src="/images/blog-icon-default.png" className='image-default' alt='Default Blog' loading="lazy" /></Lazyload>}
												<Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
											</div>
											<div className="case-content d-flex flex-column small-paragraph flex">
												<div className="flex-0-0 last-mb-none heading">
													<h3><Link to={link} className="color-inherit">{title}</Link> </h3>
												</div>
												{link && <Link to={link} className="link-line flex-0-0 link-purple">Read More</Link>}
											</div>
											{/* <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link> */}
										</div>
									</div>
								})}
							</div>

							{loadMoreIdx <= postRender.length - 1 && <div className="text-center">
							<a className="btn btn-load-more" onClick={loadMoreHandler}>
								<span>Load More</span>
							</a>
						</div>}
						</div>
					</section>
					{/* <Spacing item={item}/> */}
				</>
			);
		}}
	/>
)
