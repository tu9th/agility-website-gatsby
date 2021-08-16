import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import "./CaseStudyDetails.scss"
import "./RichTextArea.scss"

const CaseStudyDetails = (props) => {

	console.log(`props Detail`, props)

	let caseStudy = props.dynamicPageItem?.customFields;

	return (
		<>
			<section className="p-w new-case-study-details">
				<div className="container">
					<div className="d-lg-flex flex-grow">
						<div className="cs-detail-cont-left beauty-ul">
							<div className="cs-detail-inner">
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.rightContentCopy)}></div>
								<div dangerouslySetInnerHTML={renderHTML(caseStudy?.textblob)} />
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
										<span className="d-inline-block cs-tag"><a href={'#'} target="_self">{'Travel & Hospitality'}</a></span>
									</p>
								</div>
								<div className="small-paragraph">
									<h4>Challenges</h4>
									<p>
										<span className="d-inline-block cs-tag"><a href={'#'} target="_self">Ecommerce</a></span>
										<span className="d-inline-block cs-tag"><a href={'#'} target="_self">Omnichannel Content</a></span>
									</p>
								</div>

								<div>
									{caseStudy?.quote &&
										<>
											<CaseStudySocialShare {...props} />
											<blockquote>{caseStudy.quote}</blockquote>
											<div className="author-info">
												<h6>Shawn Hart</h6>
												<p>Director of Web Development & Enterprise Applications Visit Orlando</p>
											</div>
										</>
									}
								</div>
							</div>
						}
					</div>
					{caseStudy.cTA && <CallToAction item={caseStudy.cTA} />}
				</div>
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