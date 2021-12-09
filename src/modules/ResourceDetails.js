import React, {useRef, useEffect} from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import { renderHTML } from '../agility/utils'
import ResponsiveImage from '../components/responsive-image.jsx'
import CallToAction from "../components/call-to-action.jsx"
import './ResourceDetails.scss'
import './RichTextArea.scss'
import LazyBackground from '../utils/LazyBackground'
import PostItemImageVertical from '../modules/DownloadableItem'
import DownloadEbookForm from '../components/forms/DownloadEbookForm'
import NewDowloadableEbooks from './NewDowloadableEbooks'
import { animationElementInnerComponent } from '../global/javascript/animation';



const renderTags = (tags, type) => {
	console.log(typeof tags, tags?.length);
	if (typeof (tags) === 'object' && !tags.length) {
		let link = `/resources/${type}/${tags?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
		return (
			<span className="d-inline-block cs-tag ps-rv">
				{tags?.customFields?.title}
				<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tags?.customFields?.title}</span></Link>
			</span>
		)
	}
	return tags?.map((tag, index) => {
		let link = `/resources/${type}/${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
		return (
			<span key={index} className="d-inline-block cs-tag ps-rv">
				{tag?.customFields?.title}
				<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
			</span>
		)
	})
}

const RightCTA = ({rightCTAButton, rightCTAContent}) => {

  return (
		<>
			{rightCTAContent && rightCTAButton.href &&
				<div className="learn-more-cta bg-58 text-white">
					<div className="d-table w-100">
						<div className="d-table-cell align-middle text-center small-paragraph last-mb-none">
							<div dangerouslySetInnerHTML={renderHTML(rightCTAContent)}></div>
							{ rightCTAButton &&
								<Link to={rightCTAButton.href} className="btn btn-white mb-0">{rightCTAButton.text || 'Watch Now'}</Link>
							}
						</div>
					</div>
				</div>
			}
		</>
  )
}


const TopReads = ({ item }) => {
	return (
		<>
			<div className="top-read-for-u">
				<div className="container ps-rv bg">
					<div className="top-read-line"></div>
				</div>
			</div>
			<NewDowloadableEbooks item={item} />

		</>
	);
}

const RecommendedWebinar = ({item}) => {
	if (item) {
		const customFields = item.customFields
		let resType = customFields?.resourceTypeName?.toLowerCase().replace(/ /g, "-") || ''
  	const link = `/resources/${resType ? resType + '/' : ''}${customFields.uRL}`
		return (
			<div className="recommend-webinar">
				<h3>Recommended Webinars</h3>
				<LazyBackground className="re-webina-thumb bg" src={customFields.image?.url} />
				<div className="content-blog">
					<p>
						{renderTags(customFields.resourceType, 'category')}
					</p>
					{customFields.title &&
						<h3>{customFields.title}</h3>
					}
					<Link to={link} className="link-line link-purple">Watch Now</Link>
				</div>
			</div>
		)
	}
	return (
	<div className="recommend-webinar">
		<h3>Recommended Webinars</h3>
	</div>
	)
}


/* ______________________ */
/* ______________________ */
/* ______________________ */
/* Main Component Detail */

const ResourceDetails = ({ item, dynamicPageItem }) => {

	let resource = dynamicPageItem.customFields;
	item = item.customFields;

		// console.log(item, 'babab', dynamicPageItem);
	console.log('item', item, resource);

	const resourceTypes = Array.isArray(resource.resourceType) || !resource.resourceType ? resource.resourceType : [resource.resourceType]
	const resourceTopics = Array.isArray(resource.resourceTopics) || !resource.resourceTopics ? resource.resourceTopics : [resource.resourceTopics]
	const classModule = resource.resourceTypeName &&
	(resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName.toLowerCase() === 'webinar') ? 'res-download-detail' : '';

	const thumbImage = resource.resourceTypeName &&
	(resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName.toLowerCase() === 'webinar') ? resource.bookCover : resource.image;
	if (thumbImage) {
		thumbImage.label = thumbImage?.label ? thumbImage.label : resource.title
	}	
	const topReadsItem = {
		customFields: {
			content: `<h2>Top Picks For You</h2>`,
			listeBooks: resource.topReads,
			cTAButton: {
				href: '/resources',
				text: 'View All Resources'
			}
		}
	}

	const linkResource = `/resources/${resource.resourceTypeName.toLowerCase()}/${resource.uRL}`

	const topWebinar = resource.topWebinars?.length ? resource.topWebinars[0] : resource.topWebinars

	/* animation module */
	const thisModuleRef = useRef(null)
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
	return (
		<React.Fragment>
		<section ref={thisModuleRef} className={`resource-details new-resource-detail animation ${classModule}`}>
			<div className="space-70 space-dt-90"></div>
			<div className="container ps-rv z-2 ">
        <div className="d-lg-flex flex-wrap">
          <div className="cs-detail-cont-left content-ul beauty-ul anima-left">
            <div className="cs-detail-inner last-mb-none">
							<div className="date-box small-paragraph">
								<span className="date">{DateTime.fromISO(resource.date).toFormat("MMM d, yyyy")}</span>
							</div>
						<h1 className="h1">{resource.title}</h1>
						{resource.subTitle &&
							<p>{resource.subTitle}</p>
						}
						{thumbImage && thumbImage.url &&
							<div className="image-thumb">
								<ResponsiveImage img={thumbImage}
									breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }, { w: 1200, max: 1920 }]} />
							</div>
						}

						<div className="content mt-35">
							<div dangerouslySetInnerHTML={renderHTML(resource.textblob)}></div>
						</div>
            </div>
          </div>
          {/*  */}
          <div className="cs-detail-cont-right anima-right">
						{resourceTypes && resourceTypes.length &&
							<div className="small-paragraph cs-tag-wrap last-mb-none">
								<h4>Categories</h4>
								<p>
									{renderTags(resourceTypes, 'category')}
								</p>
							</div>
						}
						{resourceTopics && resourceTopics.length &&
							<div className="small-paragraph cs-tag-wrap last-mb-none">
								<h4>Topics</h4>
								<p>
									{renderTags(resourceTopics, 'topic')}
								</p>
							</div>
						}
						{(resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'webinar') &&
							<DownloadEbookForm item={{customFields: item}} slug={resource.uRL} />						
						}
						<div className="space-50 space-dt-0"></div>
						<SocialShare url={linkResource} />
						<div className="space-50 space-dt-80"></div>
						{topWebinar &&
							<>
								<RecommendedWebinar item={topWebinar} />
								<div className="space-50 space-dt-80"></div>
							</>
						}
            {/* <CTA /> */}
						<RightCTA rightCTAButton={resource.rightCTAButton} rightCTAContent={resource.rightCTAContent} />

          </div>
        </div>
      </div>
		</section>

		{(resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'ebook' || resource.resourceTypeName && resource.resourceTypeName.toLowerCase() === 'webinar') &&
			<>
				<TopReads item={topReadsItem} />
				<div className="space-80"></div>
			</>
		}
		</React.Fragment>
	);
}

export default ResourceDetails;


const SocialShare = ({ url }) => {
	let shareLink = url.charAt(0) === '/' ? url.replace('/', '') : url
	shareLink = shareLink.trim()
	const domain = 'https://agilitycms.com'
	return (
		<>
			<div className="cs-d-social">
				<h5>Share This</h5>
				<div className="soc-box d-flex flex-wrap">
					<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-linkedin2"></span>
					</a>
					<a href={`https://twitter.com/intent/tweet/?url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-twitter"></span>
					</a>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
						<span className="icomoon icon-facebook"></span>
					</a>
				</div>
			</div>
		</>
	)
}