import React from 'react';
import { renderHTML } from '../agility/utils'
import PostItem from '../modules/PostItem'
import './NewFeaturedCaseStudies.scss'
import { Link } from 'gatsby'
import Spacing from './Spacing';

const NewFeaturedCaseStudies = ({ item }) => {
  const { content, cTAButton, listCaseStudies } = item?.customFields
  console.log('NewFeaturedCaseStudies', listCaseStudies)
  const listCaseStudiesRender = listCaseStudies?.map((post, index) => {
    post.url = 'case-studies/' + post?.customFields?.uRL
    return (
      <div className="col-md-6 col-lg-4 mb-45" key={index}>
        <PostItem showCustomerLogo={true} post={post} />
      </div>
    )
  })
  return (
    <>
    <section>
      <div className="container ps-rv bg">
        { content &&
          <div className="mx-auto mb-5 last-mb-none max-w-940 text-center beauty-ul" dangerouslySetInnerHTML={renderHTML(content)}></div>
        }
        <div className="row">
          {listCaseStudiesRender}
        </div>
        { cTAButton && cTAButton.href &&
          <div className="text-center mt-35">
            <Link to={cTAButton?.href} className="btn btn-browser-all">
              <span>{cTAButton.text ? cTAButton.text : 'Browser All Case Studies'}</span>
            </Link>
          </div>
        }
      </div>
    </section>
    <Spacing item={item}/>
    </>
	);
}

export default NewFeaturedCaseStudies;
