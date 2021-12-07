import React from 'react';
import { renderHTML } from '../agility/utils'
import PostItemImageVertical from '../modules/DownloadableItem'
import Spacing from './Spacing'
import './NewDowloadableEbooks.scss'
import { Link } from 'gatsby'

const NewDowloadableEbooks = ({ item }) => {
	console.log('NewDowloadableEbooks', item)
  const { content, cTAButton, listeBooks } = item?.customFields
  const listEBooks = listeBooks?.map((post, index) => {
    return (
      <div className="col-md-6 col-lg-4" key={index}>
        < PostItemImageVertical post={post} isVerticalImage= {true} />
      </div>
    )
  })
	return (
    <>
    <section>
      <div className="container ps-rv bg">
        { content &&
          <div className="mx-auto mb-45 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
        }
        { listEBooks && listEBooks.length &&
          <div className="row">
            { listEBooks }
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
    <Spacing item={item}/>
    </>
	);
}

export default NewDowloadableEbooks;
