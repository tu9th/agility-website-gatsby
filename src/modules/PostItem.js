import { Link } from 'gatsby'
import React from 'react'
import LazyBackground from '../utils/LazyBackground'
import Lazyload from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'

const PostItem = ({ post, isIntegration }) => {
  const thumbUrl = post?.customFields?.postImage?.url
  const link = post?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt

	const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}

  return (
    <div className="case-box h-100 transition-25 ps-rv">
      <div className="case-thumb ps-rv overflow-hidden">
        {!isIntegration && <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />}
        {isIntegration && <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>}
      </div>
      <div className="case-content small-paragraph">
        <h3>{title}</h3>
        <p>{trimText(body)}</p>
        {link &&
          <Link to={link} className="link-line link-purple">Read More</Link>
        }
      </div>
      <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
    </div>
  )
}

export default PostItem