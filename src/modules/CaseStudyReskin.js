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
import { animationElementInnerComponent } from '../global/javascript/animation'

const CaseStudyReskin = ({ item, posts = [] }) => {

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
  const tmpBelowPosts = posts.slice(8, 16);

  /* init state */
  const [abovePosts, setAbovePosts] = useState(tmpAbovePosts)
  const [belowPosts, setBelowPosts] = useState(tmpBelowPosts)
  const [industriesOpts, setIndustriesOpts] = useState(tmpIndustriesOpts)
  const [challengesOpts, setChallengesOpts] = useState(tmpChallengesOpts)
  const [postsList, setPostsList] = useState(posts)

  const [pagingIndex, setPagingIndex] = useState(0)
  const [btnPagingList, setBtnPagingList] = useState([])

  const timeORef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  const halfPost = isMobile ? 5 : 8


  useEffect(() => {
    const checkIsMobile = () => {
      clearTimeout(timeORef.current)
      timeORef.current = setTimeout(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      }, 100)
    }

    const loadFilterOpts = () => {
      const search = window.location.search.substring(1)
      let params = search.split('&')
      params = params.map(p => {
        return (p.split('='))
      })
      console.log(params, search);

      if (params.length) {
        if (params[0] && params[0][1]) {
          setIndustriesOpts({ ...industriesOpts, selectedOption: [params[0][1]] })
        }
        if (params[1] && params[1][1]) {
          setChallengesOpts({ ...challengesOpts, selectedOption: [params[1][1]] })
        }
      }
    }
    checkIsMobile()
    loadFilterOpts()
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])


  /* calc post per page when has updated */
  const handlePostsPerPage = () => {
    const min = halfPost * 2 * pagingIndex
    const max = halfPost * 2 * (pagingIndex + 1)
    const tmpAbovePosts = postsList.slice(min, max - halfPost);
    const tmpBelowPosts = postsList.slice(min + halfPost, max);
    setAbovePosts(tmpAbovePosts)
    setBelowPosts(tmpBelowPosts)
  }

  useEffect(() => {
    handlePostsPerPage()
  }, [halfPost, pagingIndex, postsList])
  /* -------------------- */

  /* chekc update filter options */
  useEffect(() => {

    /* reset paging when filter */
    setPagingIndex(0);

    const indKey = industriesOpts.selectedOption[0]
    const chaKey = challengesOpts.selectedOption[0]
    let slug = ''
    let url = window.location.href
    url = url.substring(0, url.indexOf('?'))
    if (indKey === 1 && chaKey === 1) {
      setPostsList(posts)
      window.history.pushState({}, '', url)
    } else {
      /* get text of Category */
      const currentInd = industries[indKey]
      const currentCha = challenges[chaKey]
      let tmpPosts = posts.filter(post => {
        /* just challeges */
        if (!currentInd) {
          if (post.customFields?.caseStudyChallenges_TextField
            && post.customFields?.caseStudyChallenges_TextField?.indexOf(currentCha) !== -1) {
            return post
          }
        }
        /* just industries */
        if (!currentCha) {
          if (post.customFields?.caseStudyIndustries_TextField
            && post.customFields?.caseStudyIndustries_TextField?.indexOf(currentInd) !== -1) {
            return post
          }
        }
        /* both */
        if (post.customFields?.caseStudyIndustries_TextField && post.customFields?.caseStudyIndustries_TextField?.indexOf(currentInd) !== -1
          && post.customFields?.caseStudyChallenges_TextField && post.customFields?.caseStudyChallenges_TextField?.indexOf(currentCha) !== -1) {

          return post
        }
      })

      slug = `?industry=${indKey}&challenge=${chaKey}`
      /*  */
      window.history.pushState({}, '', url + slug)
      setPostsList(tmpPosts)
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


  /* Pagination actions */
  const actionFwd = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    setPagingIndex(max - 1)
  }
  const actionBwd = () => {
    setPagingIndex(0)
  }
  const actionNextPage = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    if (pagingIndex < max) {
      setPagingIndex(pagingIndex + 1)
    }
  }
  const actionPrevPage = () => {
    if (pagingIndex > 0) {
      setPagingIndex(pagingIndex - 1)
    }
  }

  const handlePagingList = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    const tmp = []
    if (max < 3) {
      for (let i = 0; i < max; i++) {
        tmp.push(i)
      }
    } else {
      if (pagingIndex === 0) {
        tmp = [1, 2, 3]
      } else
        if (pagingIndex === max) {
          tmp = [max - 2, max - 1, max]
        } else {
          tmp = [pagingIndex - 1, pagingIndex, pagingIndex + 1]
        }
    }

    setBtnPagingList(tmp)
  }

  useEffect(() => {
    handlePagingList()
  }, [pagingIndex, postsList])
  /* --------------------------- */

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
      <section ref={thisModuleRef} className="animation">
        <div className="container anima-bottom">
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
        <div className="container anima-bottom delay-2">
          <div className="row">
            {renderPosts(belowPosts, true)}
          </div>
        </div>
        <div className="container">
          {btnPagingList.length > 1 &&
            <div className="">
              <ul className="pagination">
                <li className={`style-prev style-double ${pagingIndex <= 0 ? 'disable-paging' : ''}`} onClick={() => { actionBwd() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                <li className={`style-prev ${pagingIndex <= 0 ? 'disable-paging' : ''}`} onClick={() => { actionPrevPage() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                {btnPagingList.map((index) => {
                  return (
                    <li key={index} className={pagingIndex === index ? 'active' : ''} onClick={() => { setPagingIndex(index) }}>{index + 1}</li>
                  )
                })}
                <li className={`page-next ${pagingIndex >= postsList.length / (halfPost * 2) - 1 ? 'disable-paging' : ''}`} onClick={() => { actionNextPage() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                <li className={`style-double ${pagingIndex >= postsList.length / (halfPost * 2) - 1 ? 'disable-paging' : ''}`} onClick={() => { actionFwd() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
              </ul>
            </div>
          }

        </div>
      </section>
      <Spacing item={item} />
    </>
  )
}

export default CaseStudyReskin


const PostItem = ({ post }) => {
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