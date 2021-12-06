import React from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import { renderHTML } from '../agility/utils'
import ResponsiveImage from '../components/responsive-image.jsx'
import CallToAction from "../components/call-to-action.jsx"
import './ResourceDetails.scss'
import './RichTextArea.scss'



const renderTags = (tags, type) => {

	// if (typeof tags )
	console.log(typeof tags, tags.length);
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

const ResourceDetails = ({ item, dynamicPageItem }) => {
	let resource = dynamicPageItem.customFields;
	item = item.customFields;

	console.log('item', resource);
	return (
		<section className="resource-details">
			<div className="rich-text">
				<div className="container p-w-small">
					<h1 className="h1">{resource.title}</h1>
					{resource.subTitle &&
						<h4 className="h4">{resource.subTitle}</h4>
					}
					<div className="meta">

							<div className="author-image">
								<img src={resource.author.customFields.image ? resource.author.customFields.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={resource.author.customFields.title ? resource.author.customFields.title : 'author image'} />
							</div>
							<h5 className="h5">{resource.author.customFields.title}</h5>

						<span className="date">{DateTime.fromISO(resource.date).toFormat("MMM d, yyyy")}</span>
					</div>

					{resource.image &&
						<div className="image">
							<ResponsiveImage img={resource.image}
								breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }, { w: 1200, max: 1920 }]} />
						</div>
					}

					<div className="content">
						<div dangerouslySetInnerHTML={renderHTML(resource.textblob)}></div>

						<div className="download-button">
							{resource.fileDownload &&
								<a className="btn" href={resource.fileDownload.url} title={resource.fileDownload.label}>{resource.fileDownload.label}</a>
							}
						</div>

						{ resource.cTA && <CallToAction item={resource.cTA} /> }

					</div>

					{
						item.backButton && item.backButton.text && item.backButton.href &&
						<Link to={item.backButton.href} className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={item.backButton.text} /><span>{item.backButton.text}</span></Link>
					}
				</div>
			</div>

			<div className="space-100"></div>
			
			<div className="container">
        <div className="d-flex flex-wrap">
          <div className="cs-detail-cont-left content-ul beauty-ul">
            <div className="cs-detail-inner last-mb-none">
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
                {/* {renderTags(resource.resourceTopics, 'topic')} */}
              </p>
            </div>
            <div className="small-paragraph cs-tag-wrap last-mb-none">
              <h4>Topics</h4>
              <p>
                {renderTags(resource.resourceTopics, 'topic')}
              </p>
            </div>

            {/*  */}
            {/* <GetResourceForm /> */}
            {/* recommend webinar */}
            {/* <RecommendWebinar /> */}
            <div className="space-80"></div>
            {/* <CTA /> */}
						<RightCTA rightCTAButton={resource.rightCTAButton} rightCTAContent={resource.rightCTAContent} />
            
          </div>
        </div>
      </div>
		</section>
	);
}

export default ResourceDetails;


