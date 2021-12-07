import React from 'react';
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



const renderTags = (tags, type) => {

	// if (typeof tags )
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
	return tags.map((tag, index) => {
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
    <div className="learn-more-cta bg-58 text-white">
      <div className="d-table w-100">
        <div className="d-table-cell align-middle text-center small-paragraph last-mb-none">
					<div dangerouslySetInnerHTML={renderHTML(rightCTAContent)}></div>
         <Link to={rightCTAButton.href} className="btn btn-white mb-0">Watch Now</Link>
        </div>
      </div>
    </div>
  )
}


const TopReads = ({ item }) => {
  const { content, listeBooks } = item
  const listEBooks = listeBooks?.map((post, index) => {
    return (
      <div className="col-md-6 col-lg-4" key={index}>
        < PostItemImageVertical post={post} isVerticalImage= {true} />
      </div>
    )
  })
	return (
    <section>
      <div className="container ps-rv bg">
          <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul">
						<h2>Top Picks For You</h2>
					</div>
        { listEBooks && listEBooks.length &&
          <div className="row">
            { listEBooks }
          </div>
        }
      </div>
    </section>
	);
}

const RecommendedWebinar = ({item}) => {

	const customFields = item.customFields
	const link = `/resources/${customFields.resourceTypeName.toLowerCase()}/${customFields.uRL}`;
	return (
    <div className="recommend-webinar">
      <h3 className="h2">Recommended Webinars</h3>
      <LazyBackground className="re-webina-thumb bg" src={customFields.image?.url} />
      <div className="content-blog">
        <p>
          {renderTags(customFields.resourceType, 'tag')}
        </p>
				{customFields.title &&
        	<h3>{customFields.title}</h3>
				}
        <Link to={link} className="link-line link-purple">Watch Now</Link>
      </div>
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


	const topReadsItem = {
			content: resource.topReads_TextField,
			listeBooks: resource.topReads
	}

	const linkResource = `/resources/${resource.resourceTypeName.toLowerCase()}/${resource.uRL}`

	const topWebinar = resource.topWebinars?.length ? resource.topWebinars[0] : resource.topWebinars

	console.log('item', item, resource);
	return (
		<React.Fragment>
		<section className="resource-details new-resource-detail">
			<div className="space-50 space-dt-100"></div>
			<div className="container">
        <div className="d-flex flex-wrap">
          <div className="cs-detail-cont-left content-ul beauty-ul">
            <div className="cs-detail-inner last-mb-none">
							<div className="mb-5">
								<span className="date">{DateTime.fromISO(resource.date).toFormat("MMM d, yyyy")}</span>
							</div>
						<h1 className="h1">{resource.title}</h1>
						{resource.subTitle &&
							<p>{resource.subTitle}</p>
						}
						{resource.image &&
							<div className="image">
								<ResponsiveImage img={resource.image}
									breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }, { w: 1200, max: 1920 }]} />
							</div>
						}

						<div className="content mt-35">
							<div dangerouslySetInnerHTML={renderHTML(resource.textblob)}></div>
						</div>
            </div>
          </div>
          {/*  */}
          <div className="cs-detail-cont-right">
            <div className="small-paragraph cs-tag-wrap last-mb-none">
              <h4>Categories</h4>
              <p>
                {renderTags(resource.resourceType, 'tag')}
              </p>
            </div>
            <div className="small-paragraph cs-tag-wrap last-mb-none">
              <h4>Topics</h4>
              <p>
                {renderTags(resource.resourceTopics, 'topic')}
              </p>
            </div>
						<SocialShare url={linkResource} />
						<div className="space-50 space-dt-80"></div>
						<DownloadEbookForm item={{customFields: item}} slug={resource.uRL} />
						<div className="space-50 space-dt-80"></div>
            <RecommendedWebinar item={topWebinar} />
            <div className="space-50 space-dt-80"></div>
            {/* <CTA /> */}
						<RightCTA rightCTAButton={resource.rightCTAButton} rightCTAContent={resource.rightCTAContent} />

          </div>
        </div>
      </div>
		</section>

		<TopReads item={topReadsItem} />
		<div className="space-80"></div>
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
				<h5>Share Case Study</h5>
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