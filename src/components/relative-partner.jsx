import { graphql, useStaticQuery, Link } from "gatsby";
import React from "react";
// import PostItem from "../modules/PostItem";
import ResponsiveImage from "./responsive-image";

const RelativePartners = ({regions = [], currentPartnerId}) => {

  const query = useStaticQuery(graphql`
    query AllPartner {
      allAgilityPartner(sort: {fields: properties___itemOrder, order: DESC}) {
        nodes {
          contentID
          customFields {
            uRL
            website {
              href
              text
            }
            title
            excerpt
            customTagsNames
            partnerLogo {
              url
              filesize
              height
              pixelHeight
              pixelWidth
              width
              label
            }
          }
          properties {
            itemOrder
          }
        }
      }
    }`)


    const checkPartnerHasSameRegion = (item) => {
      
    }


    const allPartners = query.allAgilityPartner?.nodes
    
    // console.log('query part', allPartners, regions, currentPartnerId);

    const renderPartnerList = allPartners.filter((partner, index) => {
      for (let i = 0; i < regions.length; i++) {
        if (partner.customFields?.customTagsNames && partner.customFields?.customTagsNames?.indexOf(regions[i].customFields?.title) !== -1 && partner.contentID !== currentPartnerId) {
          // console.log('good');
          return partner          
        }
      }
      // if (index === 51) {
      //   console.log('aaa', partner, partner.customFields?.website);
      // }
      // if (partner.customFields?.website?.text === '9thwonder.com') {
      //   return partner
      // }
    })


    const renderLists = renderPartnerList.slice(0, 3)
    // console.log('renderPartnerList', renderPartnerList, renderLists);


  return (
    <>
      <section className="relative-partner">
        <div className="container">
        <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul">
          <h2>More Partners From Your Region</h2>
        </div>
          <div className="row">
            {renderLists.map((partner, index) => {
              const link = `/partners/implementation/${partner?.customFields?.uRL}`
              console.log('partner.customFields?.title', partner.customFields?.title, link);
              const post = {
                customFields: {
                  postImage: {
                    url: partner.customFields?.partnerLogo?.url
                  },
                  uRL: link,
                  title: partner.customFields?.title,
                  excerpt: partner.customFields?.excerpt
                }

              }
              return (
                <div className="col-12 col-md-6 col-lg-4 post-item" key={`post-${partner.contentID}`}>
                  <div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
                    <PostItem logoImg={partner.customFields?.partnerLogo} link={link} title={partner.customFields?.title} excerpt={partner.customFields?.excerpt} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-45">
            <Link to={'/partners/implementation'} className="btn mb-0">
              <span>Explore All Partners</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default RelativePartners


const PostItem = ({ logoImg, link, title, excerpt }) => {
  const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}
	return (
		<>
      <div className="case-box h-100 transition-25 ps-rv d-flex flex-column">
        <div className="case-thumb ps-rv overflow-hidden">
          {logoImg && <ResponsiveImage img={logoImg} />}
        </div>
        <div className="case-content d-flex flex-column small-paragraph flex">
          <div className="flex-0-0">
            <h3>{title}</h3>
          </div>
          <div className="flex">
            <p>{trimText(excerpt)}</p>
          </div>
          {link &&
            <Link to={link} className="link-line link-purple">Read More</Link>
          }
        </div>
        <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
      </div>
		</>
	)
}