import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
// import { renderHTML } from '../agility/utils'
// import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyBackground from '../utils/LazyBackground'
import "./CaseStudyContentPanel.scss"

const CaseStudyContentPanel = ({ item, dynamicPageItem }) => {

	const query = useStaticQuery(graphql`
		query KeyValuePairCaseStudyQuery {
			allAgilityKeyValuePair(sort: {fields: properties___itemOrder}) {
				nodes {
					contentID
					languageCode
					properties {
						referenceName
						itemOrder
					}
					customFields {
						key
						value
					}
				}
			}
		}
	`)

	let caseStudy = dynamicPageItem.customFields;
	// let bgColor = caseStudy.brandBGColor;
	// let fgColor = caseStudy.brandFGColor;



	const metricsReferenceName = dynamicPageItem.customFields.metrics.referencename;

	//filter out only those logos that we want...
	let metrics = query.allAgilityKeyValuePair.nodes.filter(m => {
		return m.properties.referenceName === metricsReferenceName;
	});

	metrics = metrics.slice(0, 3)
	// console.log(`caseStudy`, metrics)


	return (
		<>
			<section className="">
				<div className="container">
					<div className="row">
						<div className="col col-lg-6 col-cs-left ps-rv">
							<div className="in-left d-flex flex-column h-100">
								<div className={`d-table w-100 ${metrics.length ? '' : 'h-100'}`}>
									<div className="d-table-cell align-middle last-mb-none">
										<h1>{caseStudy.title}</h1>
										<p>{caseStudy.contentPanelCopy}</p>
									</div>
								</div>
								<LazyBackground className="case-ban-bg d-lg-none h-100 bg" src={caseStudy?.image?.url} />
								{metrics && metrics.length > 0 &&
									<div className="ps-rv cs-feature cs-metrics">
										<div className="row">
											{metrics.map((metric, index) => {
												const key = metric.customFields?.key
												const value = metric.customFields?.value
												return (
													<div key={index} className="col col-lg-4">
														<div className="cs-f-item small-paragraph last-mb-none">
															<h2 className="mb-0 text-white">{value}</h2>
															<p>{key}</p>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								}
							</div>
						</div>
						<div className="col col-lg-6 col-cs">
							<div className="in-right h-100">
								<LazyBackground className="case-ban-bg h-100 d-none d-lg-block bg" src={caseStudy?.image?.url} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="space-100"></div>
		</>

		// <section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>


		// 	<div className="container-my">
		// 		<div className="content-panel-flex">

		// 			{caseStudy.imagePosition === 'left' &&

		// 				<div className="start-image">
		// 					{caseStudy.image && caseStudy.image != null &&
		// 						<AgilityImage image={caseStudy.image} layout="constrained" width="500"   />
		// 					}
		// 				</div>

		// 			}

		// 			<div className="start-content">
		// 				<div className="sc-inner">
		// 					<div className="image">
		// 						{caseStudy.customerLogo && caseStudy.customerLogo != null ? <img src={caseStudy.customerLogo.url} alt={caseStudy.customerLogo.label} /> : null}
		// 					</div>
		// 					<div style={{ color: fgColor }} dangerouslySetInnerHTML={renderHTML(caseStudy.contentPanelCopy)} />
		// 				</div>
		// 			</div>



		// 			{caseStudy.imagePosition === 'right' &&

		// 				<div className="start-image">
		// 					<div className="image-inner">
		// 						{caseStudy.image && caseStudy.image != null ? <img src={caseStudy.image.url + '?w=500&h=500'} alt={caseStudy.image.label} /> : null}
		// 					</div>
		// 				</div>

		// 			}
		// 		</div>
		// 	</div>
		// </section>
	);
}

export default CaseStudyContentPanel;
