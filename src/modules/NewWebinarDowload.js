import React from 'react';
import { renderHTML } from '../agility/utils'
import PostItemImageVertical from '../modules/DownloadableItem'
import './NewWebinarDowload.scss'
import { Link } from 'gatsby'

const NewDowloadableEbooks = ({ item }) => {
  const { content, cTAButton, listWebinar } = item?.customFields
  const listWebinars = listWebinar?.map((post, index) => {
    return (
      <div className="col-md-6 col-lg-4" key={index}>
        < PostItemImageVertical post={post} isVerticalImage= {false} />
      </div>
    )
  })
	return (
    <section>
      <div className="container ps-rv bg">
        { content &&
          <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
        }
        { listWebinars && listWebinars.length &&
          <div className="row">
            { listWebinars }
          </div>
        }
        { cTAButton && cTAButton.href &&
          <div className="text-center">
            <Link to={cTAButton?.href} className="btn">
              <span>{cTAButton.text ? cTAButton.text : 'Browser All Downloadable items'}</span>
            </Link>
          </div>
        }
      </div>
    </section>
	);
}

export default NewDowloadableEbooks;
