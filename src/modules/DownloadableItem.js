import { Link } from 'gatsby'
import React from 'react'
import LazyBackground from '../utils/LazyBackground'
import Lazyload from 'react-lazyload'
import Helpers from '../global/javascript/Helpers'

const DownloadableItem = ({ post, isVerticalImage }) => {
  console.log('DownloadableItem', post)
  const thumbUrl = post?.customFields?.postImage ? post?.customFields?.postImage?.url : post?.customFields?.image?.url
  let link = post?.customFields?.fileDownload?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt || ''
  const urlCustomer = post?.customFields?.customerWhiteLogo?.url

  if (!isVerticalImage) {
    if (post.customFields?.resourceTypeName) {
      link = `/resources/${post.customFields?.resourceTypeName.toLowerCase()}/${post.customFields?.uRL}`
    } else {
      link = `/resources/${post.customFields?.uRL}`
    }
  }

	const trimText = (text) => {
		let txt = text.split(' ')
		return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
	}

  return (
    <div className="downloadable-box h-100 transition-25 ps-rv d-flex flex-column">
        {isVerticalImage &&
         <div className="downloadable-thumb-vertical ps-rv">
            <div className="downloadable-pattern">
            <Lazyload offset={Helpers.lazyOffset}><img src="/images/features/downloadable-pattern.svg" className="bg transition-25"></img></Lazyload>
            </div>
            <div className="downloadable-img">
              <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>
            </div>
          </div>
        }
        {!isVerticalImage &&
          <Link to={link} className="ps-as"><span className="sr-only">{title}</span></Link>
        }
        {!isVerticalImage &&
          <div className="downloadable-thumb ps-rv overflow-hidden">
            <Lazyload offset={Helpers.lazyOffset}><img src={thumbUrl} className="bg transition-25"></img></Lazyload>
          </div>
        }

      <div className="downloadable-content d-flex flex-column small-paragraph flex">
        <div className="flex-0-0">
          <h3>{title}</h3>
        </div>
        <div className="flex last-mb-none">
          <p>{trimText(body)}</p>
        </div>
        {link && isVerticalImage &&
          <Link to={link} className="link-line link-purple mt-15">Download</Link>
        }
      </div>
    </div>
  )
}

export default DownloadableItem