import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import { DateTime } from 'luxon'
import ResponsiveImage from '../components/responsive-image.jsx'
import { renderHTML } from '../agility/utils'
import PostTags from "../components/PostTags.jsx"
import CallToAction from "../components/call-to-action.jsx"
import LazyBackground from '../utils/LazyBackground'

import "./RichTextArea.scss"
import "./PostDetails.scss"


const PostDetails = ({ item, dynamicPageItem, page }) => {

  item = item.customFields;
  const post = dynamicPageItem.customFields;
  const author = post.author.customFields;
  // console.log('author', author)

  //see if the post has a tweet in it...
  const hasTweets = post.textblob && post.textblob.indexOf('class="twitter-tweet"') !== -1;

  const [state, setState] = useState({
    loaded: false
  })

  const renderTags = (tags, type) => {
    return tags.map((tag, index) => {
      let link = `/partners/integrations/?${type}=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
      return <span key={'tags-' + index} className="d-inline-block cs-tag ps-rv">
        {tag?.customFields?.title}
        <Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
      </span>
    })
  }

  useEffect(() => {

    //load the g2 script...
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

      setState({
        loaded: true,
      })
    }, 1500);
  });
  let link = '/resources/posts/' + item.uRL
  let shareLink = link.charAt(0) === '/' ? link.replace('/', '') : link
  shareLink = shareLink.trim()
  const domain = 'https://agilitycms.com'

  return (
    <>
      <section className="blog-post-details d-none">
        <div className="">
          <div className="container p-w-small rich-text">
            <h1 className="h1">{post.title}</h1>
            {post.subTitle &&
              <h4 className="h4">{post.subTitle}</h4>
            }
            <PostTags post={post} />

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
          <div className="row flex-row-reverse">
            <div className="col-xl-4">
              <div className="info-post">
                <div className="info-wrap">
                  <h4>Topic</h4>
                  {renderTags([{
                    customFields: { title: 'CMS' }
                  }, {
                    customFields: { title: 'Headless CMS' }
                  }, {
                    customFields: { title: 'Jamstack' }
                  }, {
                    customFields: { title: 'Artificial Intelligence' }
                  }])}
                </div>

                <div className="info-wrap">
                  <h4>Further Reading</h4>
                  <p>
                    <a href="">relevantwebsite.com</a>
                  </p>
                </div>

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

              <div className="addition-info">
                <div className="case-box h-100 transition-25 ps-rv d-flex flex-column">
                  <div className="case-thumb ps-rv overflow-hidden">
                    <LazyBackground className="ps-as z-2 bg transition-25" src={post.postImage.url} />
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
                    <LazyBackground className="ps-as z-2 bg transition-25" src={post.postImage.url} />
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

                <div className="mod-space space-dt-50"></div>

                <div className="bg-58 text-center last-mb-none text-white flex-column d-flex align-items-center justify-content-center learn-more-section">
                  <h3>EWager to learn more?</h3>
                  <p>Nec nostrud intellegam no, tale diceret dignissim pro ei.</p>
                  <p>
                    <Link to={'https://www.google.com/'} className="btn btn-white text-decoration-none">Call to Action</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-1"></div>

            <div className="col-xl-7 rich-text">
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
              <PostTags post={post} />

              <div className="meta">
                <div className="author">
                  <div className="author-image">
                    <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
                  </div>
                  <h5 className="h5">{author?.title}</h5>
                </div>
              </div>


              {post.postImage &&
                <div className="image">
                  <ResponsiveImage img={post.postImage} layout="fullWidth" />
                </div>
              }

              <div className="post-content" dangerouslySetInnerHTML={renderHTML(post.textblob)}></div>

              <div className="meta about-author">
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

              {/* {post.cTA && <CallToAction item={post.cTA} />} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostDetails;
