import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import IntegrationDetailContent from './IntegrationDetailContent'
import IntegrationDetailGuideLink from './IntegrationDetailGuideLink'
import IntegrationDetailSimilar from './IntegrationDetailSimilar'
import * as StringUtils from "../utils/string-utils"
import CaseStudyGallery from './CaseStudyGallery';

import "./CaseStudyDetails.scss"
import "./PartnerDetail.scss"
import "./RichTextArea.scss"

export default props => (
	<StaticQuery
		query={graphql`
		query KeyValuePairPartnerDetailsQuery {
			allAgilityKeyValuePair {
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
						postImage:partnerLogo {
							url
							label
						}
						customTags {
							referencename
						}
						gallery {
							galleryid
						}
						media {
							mediaID
							fileName
							url
							size
							modifiedOn
						}
						title
						uRL
					}
				}
			}
			allAgilityLinks {
				nodes {
					customFields {
						uRL {
							href
							target
							text
						}
					}
					contentID
					id
					itemID
					properties {
						definitionName
						referenceName
					}
				}
			}
			allAgilityStepForImplementation {
				nodes {
					customFields {
						title
						excerpt
					}
					properties {
						referenceName
					}
				}
			}
		}
    `}
		render={queryData => {
			const customFields = props.dynamicPageItem.customFields
			const dynamicPageItem = props.dynamicPageItem
			const documentReferenceName = customFields?.documentationIntegration?.referencename
			const stepsReferenceName = customFields?.stepsImplementation?.referencename
			const tags = dynamicPageItem?.customFields?.customTags?.map(tag => tag.contentID)
			const mediaLists = queryData?.allAgilityPartner?.nodes?.map(node => {
				return {
					node
				}
			})
			let similarPartner = []
			if (customFields.similarList && customFields.similarList.length) {
				similarPartner = customFields.similarList.map(item => {
					console.log('item.partnerLogo', item.partnerLogo)
					item.customFields.postImage = item.customFields.partnerLogo
					return item
				})
			} else {
				similarPartner = queryData.allAgilityPartner.nodes.filter(node => {
					return node.properties.referenceName === dynamicPageItem.properties.referenceName
						&& node.customTags.some(tag => tags.includes(tag.contentID))
						&& node.contentID !== dynamicPageItem.contentID
				})
				if (similarPartner.length === 0) {
					similarPartner = queryData.allAgilityPartner.nodes.filter(node => {
						return node.properties.referenceName === dynamicPageItem.properties.referenceName
							&& node.contentID !== dynamicPageItem.contentID
					})
				}
			}
			similarPartner.length = 3
			similarPartner.forEach(partner => {
				let excerpt = partner.customFields.excerpt;
				if (excerpt) {
					partner.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}
				partner.url = "/partners/integrations/" + partner.customFields.uRL;
			})

			//filter out only those logos that we want...
			let documentation = queryData.allAgilityLinks.nodes.filter(m => {
				return m.properties.referenceName === documentReferenceName;
			});
			let steps = queryData.allAgilityStepForImplementation.nodes.filter(m => {
				return m.properties.referenceName === stepsReferenceName;
			});
			const [isIntegration, setIsIntegration] = useState(false);
			const detectIntegration = () => {
				const detectIntegration = window.location.pathname.includes('/integrations')
				setIsIntegration(detectIntegration)
			}

			useEffect(() => {
				detectIntegration()

				/* animation module */
				// const scrollEventFunc = () => {
				// 	animationElementInnerComponent(bannerRef.current)
				// }
				// animationElementInnerComponent(bannerRef.current)
				// window.addEventListener('scroll', scrollEventFunc)

				return () => {
					// window.removeEventListener('scroll', scrollEventFunc)
				}
			}, []);
			const viewModel = {
				dynamicPageItem,
				item: props.item,
				documentation: documentation || [],
				steps: steps || [],
				similarPartner
			}
			return (
				<section className="mod-integration-partner">
					{ isIntegration && <>
						<IntegrationDetailContent viewModel={viewModel}/>
						<CaseStudyGallery dataList={mediaLists} galleryId={customFields?.gallery?.galleryid} title={customFields.title} />
						{steps && steps.length > 0 && <IntegrationDetailGuideLink viewModel={viewModel}/>}
						<IntegrationDetailSimilar viewModel={viewModel} />
						</>
					}
					{ !isIntegration && <PartnerDetails {...viewModel} /> }
				</section>
			);
		}}
	/>
)

const PartnerDetails = ({ item, dynamicPageItem }) => {
	item = dynamicPageItem.customFields;
	return (
		<section className="p-w case-study-details">
			<div className="container-my">
				<div className="case-study-details-container">

					<div className="case-study-left">
						<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.textblob)}></div>
					</div>
					{
						(item.rightContentCopy || item.quote) &&

						<div className="case-study-right">
							<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.rightContentCopy)}></div>
							{item.quote && <div className="color-text"><p>{item.quote}</p></div>}
						</div>
					}
				</div>
			</div>
		</section>


	);
}
