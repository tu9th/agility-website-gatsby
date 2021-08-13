import React from 'react'
import './CaseStudyReskin.scss'
import LazyBackground from '../utils/LazyBackground'
import { Link } from 'gatsby'

const CaseStudyReskin = () => {

  const fake = {
    url: {
      href: `?#`
    },
    image: {
      href: `https://static.agilitycms.com/case-studies/images/hockey_20200516223809_0.jpg?w=800&q=60`
    },
    content: {
      headline: `Visit Orlando: 20% increase in revenue with agile Headless Commerce`,
      body: `Visit Orlando is the official tourism association for Orlando, the most-visited destination in the United States with over 1000 participating companies.`
    }
  }
  const posts = []

  for (let i = 0; i < 10; i++) {
    let tpm = JSON.parse(JSON.stringify(fake));
    tpm.content.headline += ' post ' + i
    posts.push(tpm)
  }


  const renderPosts = posts.map((post, index) => {
    let result
    switch (index) {
      case 3:
        result = <div key={index} className="col-md-6 col-lg-8 case-col">
          < PostSpecialItem post={post} longBox={true} />
        </div>
        break;
      case 4:
        result = <div key={index} className="col-md-6 col-lg-4 case-col">
          < PostSpecialItem post={post} />
        </div>
        break;

      default:
        result = <div key={index} className="col-md-6 col-lg-4 case-col">
          < PostItem post={post} />
        </div>
        break;
    }

    return result
  })

  return (
    <>
      <section>
        <div className="container">
          <div className="case-filter-box">

          </div>
          <div className="row">
            {renderPosts}
          </div>
        </div>
      </section>
      <div className="space-100"></div>
    </>
  )
}

export default CaseStudyReskin


const PostItem = ({ post }) => {

  const thumbUrl = post?.image?.href
  const link = post?.url?.href
  const title = post?.content?.headline
  const body = post?.content?.body
  return (
    <div className="case-box h-100 transition-25">
      <div className="case-thumb ps-rv overflow-hidden">
        <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />
      </div>
      <div className="case-content">
        <h3 className="">{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
        <Link to={link} className="link-line link-purple">Read More</Link>
      </div>
    </div>
  )
}
const PostSpecialItem = ({ post, longBox = false }) => {

  const thumbUrl = post?.image?.href
  const link = post?.url?.href
  const title = post?.content?.headline
  const body = post?.content?.body
  const longBoxClass = longBox ? 'long-box' : 'bg-6d'
  return (
    <div className={`case-spe-box h-100 transition-25 ps-rv ${longBoxClass}`}>
      {longBox &&
        <LazyBackground className={`transition-25 ps-as bg`} src={thumbUrl} />
      }
      <div className="case-content d-table ps-rv h-100">
        <div className="d-table-cell ps-rv align-middle">
          <div className="case-logo">
            <img src="https://static.agilitycms.com/logos/1200px-hockey_canada.svg_20190621181917_0.png" />
          </div>
          <h3 className="">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: body }}></div>
          <Link to={link} className={`mb-0 btn ${longBox ? 'btn-yellow' : 'btn-outline-white'}`}>Read More</Link>
        </div>
      </div>
    </div>
  )
}