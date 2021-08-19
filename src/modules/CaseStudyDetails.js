import React, { useEffect } from 'react';
import { graphql, StaticQuery, useStaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import Slider from 'react-slick'
import ResponsiveImage from '../components/responsive-image'
import LazyLoad from 'react-lazyload'
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = (props) => {


	let caseStudy = props.dynamicPageItem?.customFields;
	console.log(`props Detail`, caseStudy)

	let link = '/resources/case-studies/' + caseStudy.uRL

	const renderTags = (tags) => {
		return tags.map((tag, index) => {
			return (
				<span key={index} className="d-inline-block cs-tag"><a href={'#'} target="_self">{tag?.customFields?.title}</a></span>
			)
		})
	}

	return (
		<>
			<section className="p-w new-case-study-details">
				<div className="container">
					<div className="cs-detail-cont d-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner last-mb-none" dangerouslySetInnerHTML={renderHTML(caseStudy?.topContent)}>
							</div>
						</div>
						<div className="cs-detail-cont-right">
							{caseStudy?.website?.href &&
								<div className="small-paragraph cs-website">
									<h4>Website</h4>
									<p><a href={caseStudy?.website?.href} target={caseStudy?.website?.target || '_blank'}>{caseStudy?.website?.text || caseStudy?.website?.href}</a></p>
								</div>
							}

							{caseStudy?.caseStudyIndustries && caseStudy?.caseStudyIndustries.length > 0 &&
								<div className="small-paragraph">
									<h4>Industries</h4>
									<p>
										{renderTags(caseStudy?.caseStudyIndustries)}
									</p>
								</div>
							}

							{caseStudy?.caseStudyChallenges && caseStudy?.caseStudyChallenges.length > 0 &&
								<div className="small-paragraph">
									<h4>Challenges</h4>
									<p>
										{renderTags(caseStudy?.caseStudyChallenges)}
									</p>
								</div>
							}

							<div>
								{caseStudy?.quote &&
									<div className="d-none d-lg-block">
										<CaseStudySocialShare link={link} title={caseStudy.title} />
										<div className="cs-quote">
											<span className="icomoon icon-quote"></span>
											<div dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
										</div>
									</div>
								}
							</div>
						</div>
					</div>
				</div>

				<CaseStudyGallery galleryId={caseStudy?.gallery?.galleryid} title={caseStudy.title} />

				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.bottomContent)} />
							</div>
						</div>
						<div className="cs-detail-cont-right fake" />
					</div>
					{caseStudy?.quote &&
						<div className="d-lg-none">
							<CaseStudySocialShare link={link} title={caseStudy.title} />
							<div className="cs-quote">
								<span className="icomoon icon-quote"></span>
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
							</div>
						</div>
					}
				</div>

				{/* {caseStudy.cTA && <CallToAction item={caseStudy.cTA} />} */}

			</section>

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

const CaseStudyGallery = ({ galleryId, title }) => {

	const query = useStaticQuery(graphql`
	query Media {
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
	}`)
	const mediaLists = query.allAgilityCaseStudy?.edges
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