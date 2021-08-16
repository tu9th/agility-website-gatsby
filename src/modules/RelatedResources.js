import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby'
import LazyBackground from '../utils/LazyBackground'
import './RelatedResources.scss'

const RelatedResources = (props) => {

  const headline = props?.item?.customFields?.title
  const query = useStaticQuery(graphql`
  query RelatedResources {
    allAgilityResource(sort: {order: DESC, fields: customFields___date}, limit: 3) {
      edges {
        node {
          customFields {
            title
            uRL
            image {
              url
              height
              width
            }
            date(formatString: "D/M/yyyy")
          }
        }
      }
    }
  }`)
  const resources = query.allAgilityResource?.edges

  const ResourcesItem = ({ resource }) => {
    const data = resource?.node?.customFields
    const imgUrl = data?.image?.url
    return (
      <div className="relate-re-box">
        <div className="overflow-hidden">
          <LazyBackground className="relate-re-thumb transition-25 bg" src={imgUrl} />
          <Link to={'/link'} className=" ps-as"><span className="sr-only">{'title'}</span></Link>
        </div>
        <div className="relate-re-cont">
          <h3>{data?.title}</h3>
          <Link to="#" className="link-line line-purple">Readmore</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="related-resources">
        <div className="container">
          <div className="text-center">
            <h2>{headline}</h2>
          </div>
          <div className="row">
            {resources.map((res, index) => {
              return <div key={index} className="col-md-6 col-lg-4">
                <ResourcesItem resource={res} />
              </div>
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default RelatedResources