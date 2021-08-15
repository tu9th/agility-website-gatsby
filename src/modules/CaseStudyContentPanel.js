import React from 'react';
// import { renderHTML } from '../agility/utils'
// import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyBackground from '../utils/LazyBackground'
import "./CaseStudyContentPanel.scss"

const CaseStudyContentPanel = ({ item, dynamicPageItem }) => {

	let caseStudy = dynamicPageItem.customFields;
	// console.log(`caseStudy`, caseStudy)
	// let bgColor = caseStudy.brandBGColor;
	// let fgColor = caseStudy.brandFGColor;

	return (
		<>
			<section className="">
				<div className="container">
					<div className="row">
						<div className="col col-lg-6 col-cs-left ps-rv">
							<div className="in-left d-flex flex-column h-100">
								<div className="d-table w-100">
									<div className="d-table-cell align-middle last-mb-none">
										<h1>{ caseStudy.title }</h1>
										<p>{ caseStudy.contentPanelCopy }</p>
									</div>
								</div>
								<div className="ps-rv cs-feature cs-metrics">
									<div className="row">
										<div className="col col-lg-4">
											<div className="cs-f-item small-paragraph last-mb-none">
												<h2 className="mb-0 text-white">10%</h2>
												<p>Conversion rate increased</p>
											</div>
										</div>
										<div className="col col-lg-4">
											<div className="cs-f-item small-paragraph last-mb-none">
												<h2 className="mb-0 text-white">20%</h2>
												<p>Conversion rate increased</p>
											</div>
										</div>
										<div className="col col-lg-4">
											<div className="cs-f-item small-paragraph last-mb-none">
												<h2 className="mb-0 text-white">50%</h2>
												<p>Conversion rate increased</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col col-lg-6 col-cs">
							<div className="in-right h-100">
								<LazyBackground className="case-ban-bg h-100 bg" src={ caseStudy?.image?.url } />
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
