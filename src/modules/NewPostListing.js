import React, { useEffect, useState} from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import SelectC8 from '../utils/SelectC8'
import Helpers from '../global/javascript/Helpers'
import { Link } from 'gatsby'
import LazyBackground from '../utils/LazyBackground'
import { DateTime } from 'luxon'
import Spacing from './Spacing'

import './NewPostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query NewPostListingQuery {
			allAgilityBlogPost(
				filter: {properties: {referenceName: {eq: "blogposts"}}}
				sort: {fields: customFields___date, order: DESC}
			) {
				nodes {
					contentID
					customFields {
						date(formatString: "MMMM D, YYYY")
						excerpt
						title
						uRL
						postImage {
							label
							url
							filesize
							height
							width
						}
						blogCategories {
							referencename
							sortids
						}
						blogCategories_TextField
						blogCategories_ValueField
					}
					category {
						customFields {
							title
						}
					}
					author {
						customFields {
							image {
								url
								label
							}
							title
						}
					}
					tags {
						contentID
						customFields {
							title
						}
					}
				}
			}
			allAgilityBlogCategory {
				nodes {
					id
					contentID
					customFields {
						title
					}
				}
			}
			allAgilityNewBlogCategory {
				nodes {
					id
					contentID
					customFields {
						title
					}
				}
			}
		  }
    `}
		render={queryData => {
			//filter out only those logos that we want...
			let posts = queryData.allAgilityBlogPost.nodes;
			let item = props.item;
			const [loadMoreIdx, setLoadMoreIdx] = useState(12)
			const tmpPostOptions = {
				name: 'posts',
				options: { ...queryData.allAgilityNewBlogCategory.nodes.reduce((obj, node) => {
					// if (node.properties.referenceName ===  tagsReferenceName ) {
						obj[node.contentID] = node.customFields.title
					// }
					return obj
				}, {}), 1: 'Blog Category' },
				selectedOption: [1]
			}
			const [postOpts, setPostOpts] = useState(tmpPostOptions)
			const [postRender, setPostRender] = useState(posts)

			//filter by tag if neccessary
			if (props.dynamicPageItem && props.dynamicPageItem.properties.definitionName === "BlogTag") {
				const tagContentID = props.dynamicPageItem.contentID;

				posts = posts.filter(p => {
					if (! p.tags || ! (p.tags.length > 0)) return false;
					const index = p.tags.findIndex(t => { return parseInt(t.contentID) === parseInt(tagContentID); });
					return index >= 0;
				});
			}

			posts.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}
				p.url = "/resources/posts/" + p.customFields.uRL;
			});

			const loadMoreHandler = () => {
				let tmpLoadMoreIdx = loadMoreIdx
				tmpLoadMoreIdx += 12
				setLoadMoreIdx(tmpLoadMoreIdx)
			}

			const renderTags = (tags, type) => {
				return tags.map((tag, index) => {
					let link = `/resources/posts?${type}=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
					return <span key={'tags-' + index} className="d-inline-block cs-tag ps-rv">
							{tag?.customFields?.title}
							<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
						</span>
				})
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
				console.log('name, value', name, value)
				if (value.includes(1)) {
					setPostRender(posts)
				} else {
					const tmpPosts = posts.filter(post => {
						return (post?.customFields?.blogCategories_ValueField || '').split(',').some(valueField => {
							return value.includes(Number(valueField))
						})
					})
					setPostRender(tmpPosts)
					setLoadMoreIdx(12)
				}
			}

			return (
				<>
					<section className="mod-new-post-listing">
						<div className="container">
							<div className="filter-wrap small-paragraph">
								<SelectC8 className="d-inline-block" data={postOpts} onChange={onChangeFilter} />
							</div>

							<section className="mod-space space-20 space-dt-50 "></section>

							<div className="row">
								{postRender.filter((item, index) => index < loadMoreIdx).map(post => {
									const thumbUrl = post?.customFields?.postImage?.url
									const link = post?.url
									const title = post?.customFields?.title
									const body = post?.customFields?.excerpt || ''
									// const date = DateTime.fromISO().toFormat("MMM d, yyyy")
									const trimText = (text) => {
										let txt = text.split(' ')
										return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
									}
									let categories = []
									if (post?.customFields?.blogCategories_TextField) {
										categories = post?.customFields?.blogCategories_TextField.split(',').map(category => {
											return { customFields: { title: category } }
										})

									}
									// console.log(categories)

									return  <div className="col-12 col-md-6 col-lg-4 post-item" key={`post-${post.contentID}`}>
										<div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
											<div className="case-thumb ps-rv overflow-hidden">
												<LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />
											</div>
											<div className="case-content d-flex flex-column small-paragraph flex">
												<div className="flex-0-0 last-mb-none heading">
													<h3>{title}</h3>
													<p className="date">{post?.customFields?.date}</p>
												</div>
												<div className="flex description">
													<p>{trimText(body)}</p>
													<div className="wrap-tags">
														{renderTags(categories)}
													</div>
												</div>
												{link && <Link to={link} className="link-line flex-0-0 link-purple">Read More</Link>}
											</div>
											<Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
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
					<Spacing item={item}/>
				</>
			);
		}}
	/>
)
