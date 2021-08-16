import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import Slider from 'react-slick'
import ResponsiveImage from '../components/responsive-image'
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = (props) => {

	console.log(`props Detail`, props)

	let caseStudy = props.dynamicPageItem?.customFields;

	const renderTags = (tags) => {
		return tags.map((tag, index) => {
			return (
				<span key={index} className="d-inline-block cs-tag"><a href={'#'} target="_self">{tag.customFields?.title}</a></span>
			)
		})
	}

	return (
		<>
			<section className="p-w new-case-study-details">
				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.rightContentCopy)}></div>
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.topContent)} />
							</div>
						</div>
						{
							<div className="cs-detail-cont-right">
								<div className="small-paragraph">
									<h4>Webiste</h4>
									<p><a href={caseStudy?.website} target="_blank">{caseStudy?.website}</a></p>
								</div>
								<div className="small-paragraph">
									<h4>Industry</h4>
									<p>
										{renderTags(caseStudy?.caseStudyIndustry)}
									</p>
								</div>
								<div className="small-paragraph">
									<h4>Challenges</h4>
									<p>
										{renderTags(caseStudy?.caseStudyChallenge)}
									</p>
								</div>

								<div>
									{caseStudy?.quote &&
										<>
											<CaseStudySocialShare {...props} />
											<div className="cs-quote">
												<span className="icomoon icon-quote"></span>
												<div dangerouslySetInnerHTML={renderHTML(caseStudy?.quote)}></div>
											</div>
										</>
									}
								</div>
							</div>
						}
					</div>
				</div>

						<CaseStudyGallery />

				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.bottomContent)} />
							</div>
						</div>
						<div className="cs-detail-cont-right" />
					</div>
				</div>

				{/* {caseStudy.cTA && <CallToAction item={caseStudy.cTA} />} */}

			</section>

		</>

	);
}

export default CaseStudyDetails



const CaseStudySocialShare = (props) => {

	const query = useStaticQuery(graphql`
	query CaseStudySocialSharing {
		allAgilitySocialFollowLink {
			nodes {
			properties {
				referenceName
				itemOrder
				}
			languageCode
			contentID
			customFields {
				followURL {
					href
					text
					}
					logo {
					label
					url
					}
					title
				}
			}
		}
	}`)

	// let links = query.allAgilitySocialFollowLink.nodes.filter(link => {
	// 	return link.properties.referenceName === props.item.customFields.socialFollowLinks.referencename;
	// });
	let links = query.allAgilitySocialFollowLink.nodes
	console.log(`query`, links)



	return (
		<>
			<div className="cs-d-social d-none d-lg-block">
				<h5>Share Case Study</h5>
				<div className="d-lg-flex flex-wrap">
					{links && links.length > 0 &&
						links.map((link, index) => {
							const title = link.title
							const logo = link.customFields?.logo
							const followURL = link.customFields?.followURL
							return (
								<a key={index} href={followURL?.href} target="_blank" className="d-flex align-items-center justify-content-center">
									<img src={logo?.url} alt={title || logo?.label} />
								</a>
							)
						})
					}
				</div>
			</div>
		</>
	)
}

const CaseStudyGallery = () => {

  const fakeImg = {
    "label": "TRY AGILITY CMS",
    "url": "https://static.agilitycms.com/Attachments/NewItems/cta-bottom-blog-free_20210624203045_0.jpg",
    "target": null,
    "filesize": 57769,
    "pixelHeight": "300",
    "pixelWidth": "975",
    "height": 300,
    "width": 975
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
  const galleries = [1, 2, 3].map((i, index) => {
    return (
      <div key={index} className="gal-item">
        <ResponsiveImage img={fakeImg} />
      </div>
    )
  });
  return (
    <>
      <section className="case-d-gallery">
        <Slider {...settings} className="gal-slider">
          {galleries}
        </Slider>
      </section>
    </>
  )
}