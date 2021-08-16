import React, { useEffect, useState } from 'react'
import './CaseStudyReskin.scss'
import LazyBackground from '../utils/LazyBackground'
import { Link } from 'gatsby'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyLoad from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'
import SelectC8 from '../utils/SelectC8'

const CaseStudyReskin = ({ item, posts = [] }) => {

  /* list clean Posts */
  const tmpAbovePosts = posts.slice(0, 8);
  const tmpBelowPosts = posts.length > 8 ? posts.slice(8, posts.length) : [];

  /* init state */
  const [abovePosts, setAbovePosts] = useState(tmpAbovePosts)
  const [belowPosts, setBelowPosts] = useState(tmpBelowPosts)

  const [isMobile, setIsMobile] = useState(false)
  console.log(`props Case`, abovePosts, belowPosts)

  useEffect(() => {
    if (window.innerWidth < 992) {
      setIsMobile(true)
    }
  }, [])

  const renderPosts = (posts, specialOnLeft = false) => {
    return posts.map((post, index) => {

      /* Mobile => each 5 items, show 1 special item on index 5 */
      if (isMobile) {
        if (index !== 0 && index % 4 === 0) {
          return (
            <div key={index} className="col-md-6 col-lg-4 case-col">
              < PostSpecialItem post={post} />
            </div>)
        } else {
          return (
            <div key={index} className="col-md-6 col-lg-4 case-col">
              < PostItem post={post} />
            </div>)
        }
      } else {
        /* Desktop => each 5 items, item 4 and 5 is special */
        if (index === 0 || (index % 5 !== 3 && index % 5 !== 4)) {
          return (
            <div key={index} className="col-md-6 col-lg-4 case-col">
              < PostItem post={post} />
            </div>)
        }

        if (index % 5 === 3) {
          return (
            <div key={index} className={`col-md-6 col-lg-${!specialOnLeft ? '8' : '4'} case-col`}>
              < PostSpecialItem post={post} longBox={!specialOnLeft} />
            </div>)
        }
        if (index % 5 === 4) {
          return (
            <div key={index} className={`col-md-6 col-lg-${specialOnLeft ? '8' : '4'} case-col`}>
              < PostSpecialItem post={post} longBox={specialOnLeft} />
            </div>)
        }
      }
    })
  }

  const industries = {
    options: { 1: 'All Industries', 2: 'b', 3: 'c' },
    selectedOption: [1],
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="case-filter-box">
            {/* <div className="row">
              <div className="col-md-6"> */}
            <SelectC8 className="d-inline-block" data={industries} onChange={() => { console.log(`change`) }} />
            {/* </div>
              <div className="col-md-6"> */}
            <SelectC8 className="d-inline-block" data={industries} onChange={() => { console.log(`change`) }} />
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="row">
            {renderPosts(abovePosts)}
          </div>
          <div className="space-100"></div>
          <div className="row">
            {renderPosts(belowPosts, true)}
          </div>
        </div>
      </section>
      <div className="space-100"></div>
    </>
  )
}

export default CaseStudyReskin


const PostItem = ({ post }) => {
  // console.log(`post`, post)
  const thumbUrl = post?.customFields?.postImage?.url
  const link = post?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt
  return (
    <div className="case-box h-100 transition-25">
      <div className="case-thumb ps-rv overflow-hidden">
        <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />
        <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
      </div>
      <div className="case-content small-paragraph">
        <h3>{title}</h3>
        <p>{body}</p>
        {link &&
          <Link to={link} className="link-line link-purple">Read More</Link>
        }
      </div>
    </div>
  )
}
const PostSpecialItem = ({ post, longBox = false }) => {

  const thumbUrl = post?.customFields?.postImage?.url
  const link = post?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt
  const logo = post?.customFields?.logo
  const longBoxClass = longBox ? 'long-box' : 'bg-6d'
  return (
    <div className={`case-spe-box h-100 transition-25 ps-rv ${longBoxClass}`}>
      {longBox &&
        <LazyBackground className={`transition-25 ps-as bg`} src={thumbUrl} />
      }
      <div className="case-content d-table ps-rv h-100 small-paragraph">
        <div className="d-table-cell ps-rv align-middle">
          <div className="case-logo">
            <LazyLoad offset={Helpers.lazyOffset}>
              <img src={logo.url} alt={logo.label || title} loading="lazy" />
            </LazyLoad>
          </div>
          <h3>{title}</h3>
          <p>{body}</p>
          {link &&
            <Link to={link} className={`mb-0 btn ${longBox ? 'btn-yellow' : 'btn-outline-white'}`}>Read More</Link>
          }
        </div>
      </div>
    </div>
  )
}