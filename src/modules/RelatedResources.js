import React from 'react';
import { Link } from 'gatsby'
import Spacing from './Spacing'
import LazyBackground from '../utils/LazyBackground'
import './RelatedResources.scss'

const RelatedResources = ({ item }) => {

  // console.log(`props Related`, item)
  const headline = item?.customFields?.title
  const resources = item?.customFields?.relatedResources

  return (
    <>
      <section className="related-resources ps-rv">
        <div className="container ps-rv">
          {headline &&
            <div className="text-center">
              <h4 className="h2">{headline}</h4>
            </div>
          }
          <div className="row">
            {resources?.map((res, index) => {
              return <div key={index} className="col-md-6 col-lg-4">
                <ResourcesItem resource={res} />
              </div>
            })}
          </div>
        </div>
      </section>
      <Spacing item={item} />
    </>
  )
}

export default RelatedResources


const ResourcesItem = ({ resource }) => {
  const data = resource?.customFields
  const imgUrl = data?.image
  const link = `/resources/${data?.resourceTypeName.toLowerCase().trim().replace(' ', '-')}/${data?.uRL}`
  return (
    <div className="relate-re-box">
      <div className="overflow-hidden">
        <LazyBackground className="relate-re-thumb transition-25 bg" src={imgUrl?.url} />
        <Link to={link} className=" ps-as"><span className="sr-only">{data?.title || imgUrl?.label}</span></Link>
      </div>
      <div className="relate-re-cont">
        <h3>{data?.title}</h3>
        <Link to={link} className="link-line line-purple">Read More</Link>
      </div>
    </div>
  )
}