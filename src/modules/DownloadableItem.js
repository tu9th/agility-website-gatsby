import { Link } from 'gatsby'
import React from 'react'
import LazyBackground from '../utils/LazyBackground'
import Lazyload from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'

const DownloadableItem = ({ post, isVerticalImage }) => {
  const thumbUrl = post?.customFields?.postImage?.url
  const link = post?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt || ''
  const urlCustomer = post?.customFields?.customerWhiteLogo?.url

	const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}

  return (
    <div className="downloadable-box h-100 transition-25 ps-rv d-flex flex-column">
        {isVerticalImage &&
         <div className="downloadable-thumb-vertical ps-rv overflow-hidden">
            <div className="downloadable-pattern">
            <Lazyload offset={Helpers.lazyOffset}><img src="/images/features/downloadable-pattern.svg" className="bg transition-25"></img></Lazyload>
            </div>
            <div className="downloadable-img">
              <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>
            </div>
          </div>
        }
        {!isVerticalImage &&
          <div className="downloadable-thumb ps-rv overflow-hidden">
            <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>
          </div>
        }

      <div className="d-flex flex-column small-paragraph flex">
        <div className="flex-0-0">
          <h3>{title}</h3>
        </div>
        <div className="flex">
          <p>{trimText(body)}</p>
        </div>
        {link &&
          <Link to={link} className="link-line link-purple">Download</Link>
        }
      </div>
    </div>
  )
}

export default DownloadableItem