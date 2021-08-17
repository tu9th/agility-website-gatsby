import React, { useEffect, useState, useRef } from 'react'
import './CaseStudyReskin.scss'
import LazyBackground from '../utils/LazyBackground'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyLoad from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'
import SelectC8 from '../utils/SelectC8'

import Spacing from './Spacing'
import SingleTestimonialPanel from './SingleTestimonialPanel'

const CaseStudyReskin = ({ item, posts = [] }) => {

  const ref = useRef(false)

  const categoryQuery = useStaticQuery(graphql`
    query IndustriesAndChallenges {
      allAgilityCaseStudyIndustry {
        edges {
          node {
            customFields {
              title
            }
            contentID
          }
        }
      }
      allAgilityCaseStudyChallenge {
        edges {
          node {
            customFields {
              title
            }
            contentID
          }
        }
      }
    }
  `)

  const industries = {};
  categoryQuery?.allAgilityCaseStudyIndustry?.edges?.map(item => {
    if (item.node?.customFields?.title && item.node?.contentID) {
      industries[item.node?.contentID] = item.node?.customFields?.title
    }
    return item
  })
  const challenges = {};
  categoryQuery?.allAgilityCaseStudyChallenge?.edges?.map(item => {
    if (item.node?.customFields?.title && item.node?.contentID) {
      challenges[item.node?.contentID] = item.node?.customFields?.title
    }
    return item?.node
  })

  /* options for select filter */
  const tmpIndustriesOpts = {
    name: 'industries',
    options: { ...industries, 1: 'All Industries' },
    selectedOption: [1],
  }
  const tmpChallengesOpts = {
    name: 'challenges',
    options: { ...challenges, 1: 'All Challenges' },
    selectedOption: [1],
  }

  // console.log(`categoryQuery`, posts, industries, challengesOpts)

  /* list clean Posts */
  const tmpAbovePosts = posts.slice(0, 8);
  const tmpBelowPosts = posts.length > 8 ? posts.slice(8, posts.length) : [];

  /* init state */
  const [abovePosts, setAbovePosts] = useState(tmpAbovePosts)
  const [belowPosts, setBelowPosts] = useState(tmpBelowPosts)
  const [industriesOpts, setIndustriesOpts] = useState(tmpIndustriesOpts)
  const [challengesOpts, setChallengesOpts] = useState(tmpChallengesOpts)

  const timeORef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  // console.log(`props Case`, item)

  useEffect(() => {
    const checkIsMobile = () => {
      clearTimeout(timeORef.current)
      timeORef.current = setTimeout(() => {
        if (window.innerWidth < 992) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      }, 300)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  useEffect(() => {
    if (industriesOpts.selectedOption[0] === 1 && challengesOpts.selectedOption[0] === 1) {
      if (isMobile) {
        const tmpAbovePosts = posts.slice(0, 5);
        const tmpBelowPosts = posts.length > 5 ? posts.slice(5, posts.length) : [];
        setAbovePosts(tmpAbovePosts)
        setBelowPosts(tmpBelowPosts)
      } else {
        const tmpAbovePosts = posts.slice(0, 8);
        const tmpBelowPosts = posts.length > 8 ? posts.slice(8, posts.length) : [];
        setAbovePosts(tmpAbovePosts)
        setBelowPosts(tmpBelowPosts)
      }
    }
  }, [isMobile])

  /* chekc update filter options */
  useEffect(() => {
    const indKey = industriesOpts.selectedOption[0]
    const chaKey = challengesOpts.selectedOption[0]
    if (indKey === 1 && chaKey === 1) {
      const tmpAbovePosts = posts.slice(0, 8);
      const tmpBelowPosts = posts.length > 8 ? posts.slice(8, posts.length) : [];

      setAbovePosts(tmpAbovePosts)
      setBelowPosts(tmpBelowPosts)
    } else {
      /* get text of Category */
      const currentInd = industries[indKey]
      const currentCha = challenges[chaKey]
      let tmpPosts = posts.filter(post => {
        /* just challeges */
        if (!currentInd) {
          if (currentCha === post.customFields?.caseStudyChallenge_TextField) {
            return post
          }
        }
        /* just industries */
        if (!currentCha) {
          if (currentInd === post.customFields?.caseStudyIndustry_TextField) {
            return post
          }
        }
        /* both */
        if (currentInd === post.customFields?.caseStudyIndustry_TextField && currentCha === post.customFields?.caseStudyChallenge_TextField) {
          return post
        }
      })

      setBelowPosts([])
      setAbovePosts(tmpPosts)
    }
  }, [industriesOpts, challengesOpts])

  const onChangeFilter = ({ name, value }) => {
    if (name === 'industries') {
      setIndustriesOpts({ ...industriesOpts, selectedOption: value })
    }
    if (name === 'challenges') {
      setChallengesOpts({ ...challengesOpts, selectedOption: value })
    }
  }

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

  return (
    <>
      <section>
        <div className="container">
          <div className="case-filter-box">
            <SelectC8 className="d-inline-block" data={industriesOpts} onChange={onChangeFilter} />
            <SelectC8 className="d-inline-block" data={challengesOpts} onChange={onChangeFilter} />
          </div>
          <div className="row">
            {renderPosts(abovePosts)}
          </div>
        </div>
        <div className="space-100"></div>
        <SingleTestimonialPanel item={item} />
        <div className="container">
          <div className="row">
            {renderPosts(belowPosts, true)}
          </div>
        </div>
      </section>
      <Spacing item={item} />
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