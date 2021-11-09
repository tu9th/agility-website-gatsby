import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import { DateTime } from 'luxon'
import ResponsiveImage from '../components/responsive-image.jsx'
import { renderHTML } from '../agility/utils'
import PostTags from "../components/PostTags.jsx"
import CallToAction from "../components/call-to-action.jsx"
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'

import "./RichTextArea.scss"
import "./PostDetails.scss"

const AboutAuthor = ({ author }) => {
  return <div className="meta about-author">
    <div className="author">
      <div className="author-image flex-0-0">
        <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
      </div>
      <div className="author-content last-mb-none">
        <h5 className="h5">About the Author</h5>
        {author?.textblob && <div className="text-blob" dangerouslySetInnerHTML={renderHTML(author?.textblob)}></div>}
        {!author?.textblob && <div className="text-blob">{author?.title}</div>}
      </div>
    </div>
  </div>
}

const renderTags = (tags, type) => {
  return tags.map((tag, index) => {
    let link = "/resources/posts/tag/" + encodeURIComponent(tag.customFields.title.toLowerCase().replace(/ /g, "-"))
    return <span key={'tags-' + index} className="d-inline-block cs-tag ps-rv">
      {tag?.customFields?.title}
      <Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
    </span>
  })
}

const InfoPost = ({ post, item, link }) => {
  let shareLink = link.charAt(0) === '/' ? link.replace('/', '') : link
  shareLink = shareLink.trim()
  const domain = 'https://agilitycms.com'
  let text = post?.furtherReading?.href
  if (post?.furtherReading?.text && post?.furtherReading?.text !== '') {
    text = post?.furtherReading?.text
  }

  return <div className="info-post">
    <div className="info-wrap">
      <h4>Topic</h4>
      {post.blogTags && renderTags(post.blogTags)}
    </div>

    {post?.furtherReading?.href && <div className="info-wrap cs-website">
      <h4>Further Reading</h4>
      <p>
        <a href={post?.furtherReading?.href} target={post?.furtherReading?.target}>{text}</a>
      </p>
    </div>}

    <div className="info-wrap cs-d-social">
      <h5>SHARE POST</h5>
      <div className="soc-box d-flex flex-wrap">
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
          <span className="icomoon icon-share2"></span>
        </a>
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
  </div>
}

const RelatedResources = ({ item, post}) => {
  const thumbUrl = post?.postImage?.url
  let link = '/resources/posts/' + item.uRL
  return <section className="mod-related-resources">
    <div className="container">
      <div className="title text-center">
        <h2>View Related Resources</h2>
      </div>
      <div className="row">
        {[0,1,2].map((item, index) => {
          return <div className="col-12 col-lg-4 post-item" key={'itemee-' + index}>
          <div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
            <div className="case-thumb ps-rv overflow-hidden">
              <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />
            </div>
            <div className="case-content d-flex flex-column small-paragraph flex">
              <div className="flex heading">
                <div className="wrap-tags">
                  {renderTags([{
                    customFields: { title: 'Guide' }
                  }])}
                </div>
                <h3>Building an Ecommerce Website with Agility</h3>
              </div>
              {link && <Link to={link} className="link-line flex-0-0 link-purple">Read More</Link>}
            </div>
            <Link to={link} className=" ps-as"><span className="sr-only">Building an Ecommerce Website with Agility</span></Link>
          </div>
        </div>
        })}
      </div>
    </div>
  </section>
}

const RightSidebar = ({ post, item, link }) => {
  const isNotEmpty = str => str && str.trim() !== ''
  let rightCTABlock = ''
  if (isNotEmpty(post.titleRightCTA) || isNotEmpty(post.contentRightCTA) || post?.buttonRightCTA?.href) {
    rightCTABlock = <>
      <div className="mod-space space-dt-50 space-20"></div>
      <div className="bg-58 text-center last-mb-none text-white flex-column d-flex align-items-center justify-content-center learn-more-section">
        {isNotEmpty(post.titleRightCTA) && <h3>{post.titleRightCTA}</h3>}
        {isNotEmpty(post.contentRightCTA) && <p>{post.contentRightCTA}</p>}
        {post?.buttonRightCTA?.href && <p>
          <Link to={post?.buttonRightCTA?.href} className="btn btn-white text-decoration-none" target={post?.buttonRightCTA?.target}>{post?.buttonRightCTA?.text}</Link>
        </p>}
      </div>
    </>
  }
  return <>
    <InfoPost post={post} item={item} link={link} />

    <div className="addition-info d-none d-lg-block">
      <div className="case-box h-100 transition-25 ps-rv d-flex flex-column">
        <div className="case-thumb ps-rv overflow-hidden">
          <LazyBackground className="ps-as z-2 bg transition-25" src={post?.postImage?.url} />
        </div>
        <div className="case-content d-flex flex-column small-paragraph flex">
          <div className="tag">
            <span className="d-inline-block cs-tag ps-rv">
              Guide
              <Link to={'https://www.google.com/'} target="_self" className="ps-as"><span className="sr-only">Guide</span></Link>
            </span>
          </div>
          <h3>Building an Ecommerce Website with Agility</h3>
          {link &&
            <Link to={'https://www.google.com/'} className="link-line link-purple">Read More</Link>
          }
        </div>
        <Link to={'https://www.google.com/'} className=" ps-as"><span className="sr-only">Building an Ecommerce Website with Agility</span></Link>
      </div>

      <div className="mod-space space-dt-50"></div>

      <div className="case-box h-100 transition-25 ps-rv d-flex flex-column">
        <div className="case-thumb ps-rv overflow-hidden">
          <LazyBackground className="ps-as z-2 bg transition-25" src={post?.postImage?.url} />
        </div>

        <div className="case-content d-flex flex-column small-paragraph flex">
          <div className="tag">
            <span className="d-inline-block cs-tag ps-rv">
              Blog
              <Link to={'https://www.google.com/'} target="_self" className="ps-as"><span className="sr-only">Guide</span></Link>
            </span>
          </div>
          <h3>Building an Ecommerce Website with Agility</h3>
          {link &&
            <Link to={'https://www.google.com/'} className="link-line link-purple">Read More</Link>
          }
        </div>
        <Link to={'https://www.google.com/'} className=" ps-as"><span className="sr-only">Building an Ecommerce Website with Agility</span></Link>
      </div>


      {rightCTABlock}
    </div>
  </>
}

const PostDetails = ({ item, dynamicPageItem, page }) => {
  console.log('dataaaaaaaaaaa', dynamicPageItem)
  item = item.customFields;
  let link = '/resources/posts/' + item.uRL
  const post = dynamicPageItem.customFields;
  const author = post.author.customFields;
  const hasTweets = post.textblob && post.textblob.indexOf('class="twitter-tweet"') !== -1;
  const [state, setState] = useState({
    loaded: false
  })

  const addHighLightScript = () => {
		const script = document.createElement("script");
		script.id = 'hightlight-code-script'
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js';
		script.async = true;
		document.body.appendChild(script);

    const link = document.createElement('link');
    const head = document.getElementsByTagName('head')[0]
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
    const runHljs = setInterval(() => {
      if (window.hljs) {
        window.hljs.highlightAll()
        clearInterval(runHljs)
      }
    }, 1000)
	}

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (state.loaded) return;
    setTimeout(function () {
      if (hasTweets) {
        //add the twitter embed...
        let script = document.createElement("script")
        script.src = "https://platform.twitter.com/widgets.js"
        script.async = true
        document.body.appendChild(script)
      }
      addHighLightScript()
      setState({
        loaded: true,
      })
    }, 1500);
  });

  return (
    <>
      <section className="blog-post-details d-none">
        <div className="">
          <div className="container p-w-small rich-text">
            <h1 className="h1">{post.title}</h1>
            {post.subTitle &&
              <h4 className="h4">{post.subTitle}</h4>
            }
            {/* <PostTags post={post} /> */}

            <div className="meta">
              <div className="author">
                <div className="author-image">
                  <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
                </div>
                <h5 className="h5">{author?.title}</h5>
              </div>
              <span className="date">{DateTime.fromISO(post.date).toFormat("MMM d, yyyy")}</span>
            </div>

            {post.postImage &&
              <div className="image">
                <ResponsiveImage img={post.postImage} layout="fullWidth" />
              </div>
            }

            <div className="post-content" dangerouslySetInnerHTML={renderHTML(post.textblob)}></div>

            {post.cTA && <CallToAction item={post.cTA} />}

            {
              item.backButton && item.backButton.text && item.backButton.href &&
              <Link to={item.backButton.href} className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>{item.backButton.text}</span></Link>
            }
          </div>
        </div>
      </section>
      <section className="blog-post-details">
        <div className="container p-w-small">
          <div className="row">
            <div className="col-xl-7 mb-0">
              <div className="rich-text">
                {
                  item.backButton && item.backButton.text && item.backButton.href &&
                  <Link to={item.backButton.href} className="back d-flex ai-center ps-rv">
                    <span className="icomoon icon-chevron-left"></span>
                    <span>{item.backButton.text}</span>
                  </Link>
                }
                <div className="date">{DateTime.fromISO(post.date).toFormat("MMM d, yyyy")}</div>

                <h1 className="h1">{post.title}</h1>
                {post.subTitle &&
                  <h4 className="h4">{post.subTitle}</h4>
                }

                <div className="meta">
                  <div className="author">
                    <div className="author-image">
                      <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
                    </div>
                    <h5 className="h5">{author?.title}</h5>
                  </div>
                </div>
              </div>

              <div className=" d-block d-lg-none">
                <RightSidebar post={post} item={item} link={link}/>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 rich-text">
              {post.postImage &&
                <div className="image">
                  <ResponsiveImage img={post.postImage} layout="fullWidth" />
                </div>
              }
              <div className="post-content" dangerouslySetInnerHTML={renderHTML(post.textblob)}></div>
              <div className="mod-space space-40 space-dt-40"></div>
              <AboutAuthor author={author}/>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-4 d-none d-lg-block">
              <RightSidebar post={post} item={item} link={link}/>
            </div>
          </div>
        </div>
      </section>
      <RelatedResources item={item} post={post}/>
      <Spacing item={{ customFields: item }} />
    </>
  );
}


export default PostDetails;
