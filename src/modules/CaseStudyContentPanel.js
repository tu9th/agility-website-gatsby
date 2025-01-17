import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState, useRef } from 'react';
// import { renderHTML } from '../agility/utils'
// import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'
import "./CaseStudyContentPanel.scss"
import Helmet from 'react-helmet'
import Lazyload from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'

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
	const customerLogo = caseStudy?.customerLogo?.url

	//filter out only those logos that we want...
	let metrics = query.allAgilityKeyValuePair.nodes.filter(m => {
		return m.properties.referenceName === metricsReferenceName;
	});

	metrics = metrics.slice(0, 3)
	// console.log(`caseStudy`, metrics)

	const [hasUnder, setHasUnder] = useState(true)

	useEffect(() => {
		const cotentRight = document.querySelector('.cs-detail-cont-right')
		if (cotentRight && hasUnder !== true) {
			setHasUnder(true)
		}
		if (!cotentRight && hasUnder !== false) {
			setHasUnder(false)
		}
	})


	const thisModuleRef = useRef(null)
	/* animation module */
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(thisModuleRef.current)
		}
		animationElementInnerComponent(thisModuleRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [])
	console.log('caseStudyyyyyyyyyyyyyyy', caseStudy)

	return (
		<>
			{caseStudy?.image?.url &&
				<Helmet>
					<link rel="preload" as="image" href={caseStudy?.image?.url + '?w=800&q=60'} media="all" />
				</Helmet>
			}
			<section ref={thisModuleRef} className="case-panel animation">
				<div className="container anima-bottom">
					<div className="row">
						<div className="col col-lg-6 col-cs-left ps-rv">
							<div className="in-left d-flex flex-column h-100">
								<div className={`d-table w-100 ${metrics.length ? '' : 'h-100'}`}>
									<div className="d-table-cell align-middle last-mb-none">
									{ customerLogo && <Lazyload offset={Helpers.lazyOffset} className="customer-logo">
										<img src={customerLogo} className="bg transition-25"></img>
									</Lazyload>}
										<h1>{caseStudy.title}</h1>
										<p>{caseStudy.excerpt}</p>
									</div>
								</div>
								<LazyBackground src={caseStudy?.image?.url}
									className={`case-ban-bg d-lg-none h-100 bg `} />
								{metrics && metrics.length > 0 &&
									<div className="ps-rv cs-feature cs-metrics">
										<div className="row last-mb-none">
											{metrics.map((metric, index) => {
												const key = metric.customFields?.key
												const value = metric.customFields?.value
												return (
													<div key={index} className="metric-col col-lg-4">
														<div className="cs-f-item small-paragraph last-mb-none">
															<h4 className="mb-0 h2 font-semi-bold text-white">{value}</h4>
															<p>{key}</p>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								}
								{metrics?.length === 0 && hasUnder &&
									<div className="fake-metric ps-rv"></div>
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
			<Spacing item={item} />
		</>
	);
}

export default CaseStudyContentPanel;
