import React, { useEffect } from 'react';
import { graphql, StaticQuery, useStaticQuery, Link } from "gatsby"
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import Slider from 'react-slick'
// import ResponsiveImage from '../components/responsive-image'
import CaseStudyRotator from './CaseStudyRotator';
import RelatedResources from './RelatedResources';
import Spacing from './Spacing'
import LazyLoad from 'react-lazyload'
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = (props) => {


	const query = useStaticQuery(graphql`
		query CustomRelatedResources {
			allAgilityCaseStudy {
				edges {
					node {
						customFields {
							media {
								url
							}
							gallery {
								galleryid
							}
						}
					}
				}
			}
			allAgilityResource(
				filter: {customFields: {resourceTypeName: {eq: "Webinar"}}}
				limit: 10
			) {
				edges {
					node {
						customFields {
							resourceTypeID
							title
							resourceTypeName
							image {
								url
								label
							}
							uRL
						}
					}
				}
			}
			allAgilityBlogPost(
				sort: {order: DESC, fields: properties___itemOrder}
				limit: 10
				filter: {customFields: {categoriesTitle: {eq: "Blog"}}}
			) {
				edges {
					node {
						customFields {
							title
							postImage {
								url
								label
							}
							categoriesTitle
							uRL
						}
					}
				}
			}
		}
	`)

	const mediaLists = query?.allAgilityCaseStudy?.edges
	const relatedRes = query?.allAgilityResource?.edges
	const relatedBlog = query?.allAgilityBlogPost?.edges
	console.log(`query`, query)

	let caseStudy = props.dynamicPageItem?.customFields;
	console.log(`props Detail`, props)

	let link = '/resources/case-studies/' + caseStudy.uRL

	/* case studies rorator data */
	const roratorItems = {}
	roratorItems.cTAbuttonText = caseStudy?.rotatorCTAbuttonText
	roratorItems.title = caseStudy?.rotatorTitle
	roratorItems.caseStudies = caseStudy?.rotatorCaseStudies
	roratorItems.darkMode = caseStudy?.rotatorDarkMode
	roratorItems.mobileSpace = caseStudy?.rotatorMobileSpace
	roratorItems.desktopSpace = caseStudy?.rotatorDesktopSpace

	/* case studies related resources data */
	const relatedItems = {}
	// relatedItems.cTAbuttonText = caseStudy?.relatedResourcesCTAbuttonText
	relatedItems.title = caseStudy?.relatedResourcesTitle || 'View Related Resources'
	relatedItems.relatedResources = caseStudy?.relatedResources
	relatedItems.darkMode = caseStudy?.relatedResourcesDarkMode
	relatedItems.mobileSpace = caseStudy?.relatedResourcesMobileSpace
	relatedItems.desktopSpace = caseStudy?.relatedResourcesDesktopSpace

	// console.log(`roratorItems`, roratorItems)
	const renderTags = (tags, type) => {
		return tags.map((tag, index) => {
			let link = `/resources/case-studies/?${type}=${tag?.customFields?.title?.toLowerCase().replace(' ', '-')}`
			return (
				<span key={index} className="d-inline-block cs-tag"><Link to={link} target="_self">{tag?.customFields?.title}</Link></span>
			)
		})
	}

	return (
		<>
			<section className="p-w new-case-study-details">
				<div className="container">
					<div className="cs-detail-cont d-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.topContent)}></div>
						</div>
						<div className="cs-detail-cont-right">
							{caseStudy?.website?.href &&
								<div className="small-paragraph cs-website last-mb-none">
									<h4>Website</h4>
									<p><a href={caseStudy?.website?.href} target={caseStudy?.website?.target || '_blank'}>{caseStudy?.website?.text || caseStudy?.website?.href}</a></p>
								</div>
							}

							{caseStudy?.caseStudyIndustries && caseStudy?.caseStudyIndustries.length > 0 &&
								<div className="small-paragraph cs-tag-wrap last-mb-none">
									<h4>Industries</h4>
									<p>
										{renderTags(caseStudy?.caseStudyIndustries, 'industry')}
									</p>
								</div>
							}

							{caseStudy?.caseStudyChallenges && caseStudy?.caseStudyChallenges.length > 0 &&
								<div className="small-paragraph cs-tag-wrap last-mb-none">
									<h4>Challenges</h4>
									<p>
										{renderTags(caseStudy?.caseStudyChallenges, 'challenge')}
									</p>
								</div>
							}

							<div>
								<div className="d-none d-lg-block">
									<CaseStudySocialShare link={link} title={caseStudy.title} />
									{caseStudy?.quote &&
										<div className="cs-quote">
											<span className="icomoon icon-quote"></span>
											<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>

				<CaseStudyGallery dataList={mediaLists} galleryId={caseStudy?.gallery?.galleryid} title={caseStudy.title} />

				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.bottomContent)} />
							</div>
						</div>
						<div className="cs-detail-cont-right fake" />
					</div>

					<div className="d-lg-none">
						{caseStudy?.quote &&
							<div className="cs-quote">
								<span className="icomoon icon-quote"></span>
								<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
							</div>
						}
						<CaseStudySocialShare link={link} title={caseStudy.title} />
					</div>
				</div>

				{/* {caseStudy.cTA && <CallToAction item={caseStudy.cTA} />} */}

			</section>
			<Spacing item={props.item} />

			<CaseStudyRotator item={{ customFields: roratorItems }} />
			{/* <RelatedResources item={{ customFields: relatedItems }} /> */}
			<CaseStudyRelatedResource resources={relatedRes} blogs={relatedBlog} item={{ customFields: relatedItems }} />

		</>

	);
}

export default CaseStudyDetails



const CaseStudySocialShare = ({ link, title }) => {

	// console.log(`query`, links)
	const domain = 'https://agilitycms.com'

	useEffect(() => {

		return () => {

		}
	}, [])

	return (
		<>
			<div className="cs-d-social">
				<h5>Share Case Study</h5>
				<div className="soc-box d-flex flex-wrap">
					<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + link}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-linkedin2"></span>
					</a>
					<a href={`https://twitter.com/intent/tweet/?text=abcd&url=${domain + '/' + link}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-twitter"></span>
					</a>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=${domain + '/' + link}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-facebook"></span>
					</a>
				</div>
			</div>
		</>
	)
}

const CaseStudyGallery = ({ dataList, galleryId, title }) => {

	// const query = useStaticQuery(graphql`
	// query Media {
	// 	allAgilityCaseStudy {
	// 		edges {
	// 			node {
	// 				customFields {
	// 					media {
	// 						url
	// 					}
	// 					gallery {
	// 						galleryid
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }`)
	const query = {}
	const mediaLists = dataList // query?.allAgilityCaseStudy?.edges
	const founded = mediaLists?.filter(i => {
		if (i.node?.customFields?.gallery?.galleryid === galleryId) {
			return i.node.customFields
		}
	})

	let listMedia = []
	if (founded && founded.length > 0) {
		listMedia = founded[0].node.customFields.media
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 650,
		arrows: true,
		rows: 1,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
	}
	const galleries = listMedia?.map((i, index) => {
		return (
			<div key={index} className="gal-item">
				{/* <ResponsiveImage img={i.url} /> */}
				{/* <LazyLoad><img src={i.url} alt="ab" /></LazyLoad> */}
				<img src={i.url} alt={title} />
			</div>

		)
	});

	return (
		<>
			<section className="case-d-gallery">
				{listMedia && listMedia.length > 0 &&
					<Slider {...settings} className="gal-slider">
						{galleries}
					</Slider>
				}

			</section>
		</>
	)
}

const CaseStudyRelatedResource = ({ resources, blogs, item }) => {

	if (!item.customFields?.relatedResources?.length) {
		resources = resources.map(res => {
			return res.node
		})
		blogs = blogs.map(blog => {
			blog.node.customFields.image = blog.node?.customFields?.postImage
			blog.node.customFields.resourceTypeName = blog.node?.customFields?.categoriesTitle
			return blog.node
		})

		resources.push(...blogs)

		resources = resources.filter(res => {
			if (res?.customFields?.image) {
				return res
			}
		})
		item.customFields.relatedResources = resources.slice(0, 3)
	}


	console.log(`resources`, resources, blogs, item)
	return (
		<RelatedResources item={item} />
	)
}