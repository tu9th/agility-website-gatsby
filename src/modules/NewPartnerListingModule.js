import React, { useEffect, useRef, useState } from 'react';
import SelectC8 from '../utils/SelectC8'
import './NewPartnerListingModule.scss'
import './CaseStudyReskin.scss'
import PostItem from './PostItem'
import { graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"

export default props => (
  <StaticQuery
    query={graphql`
    query IntegrationQuery {
      allAgilityCustomTag(sort: {order: ASC, fields: properties___itemOrder}) {
        nodes {
          contentID
          languageCode
          properties {
          referenceName
          itemOrder
          }
          customFields {
          title
          }
        }
        }
        allAgilityPartner(sort: {order: ASC, fields: properties___itemOrder}) {
        nodes {
        contentID
        languageCode
        properties {
        referenceName
          itemOrder
        }
        customTags {
          contentID
        }
        customFields {
          excerpt
          postImage:partnerLogo {
          url
          label
          }
          customTags {
          referencename
          }
          title
          uRL
        }
        }
      }
    }
    `}
    render={queryData => {
			const referenceName = props.item.customFields.partners.referencename;
      const list = queryData.allAgilityPartner.nodes.reduce((arr, node) => {
        if (node.properties.referenceName === referenceName) {
          let excerpt = node.customFields.excerpt;
          if (excerpt) {
            node.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
          }
          if (referenceName === "implementationpartners") {
            node.url = "/partners/implementation/" + node.customFields.uRL;
          } else if (referenceName === "integrationspartners") {
            node.url = "/partners/integrations/" + node.customFields.uRL;
          }
          arr = [...arr, node]
        }
        return arr
      }, [])
			const tagsReferenceName = list[0].customFields.customTags.referencename

      const options = queryData.allAgilityCustomTag.nodes.reduce((obj, node) => {
        if (node.properties.referenceName ===  tagsReferenceName) {
          obj[node.contentID] = node.customFields.title
        }
        return obj
      }, {})
      return <NewPartnerListingModule options={options} list={list}/>
    }}
  />
)

const NewPartnerListingModule = ({ options, list }) => {
  const classSection = 'module mod-integration-listing'
  const tmpIntegrationOpts = {
    name: 'integrations',
    options: { ...options, 1: 'All Integration' },
    selectedOption: [1]
  }
  let storeListIntegration = list
  const [loadMoreIdx, setLoadMoreIdx] = useState(6)
  const [listIntegration, setListIntegration] = useState(list)
  const [integrationOpts, setIntegrationOpts] = useState(tmpIntegrationOpts)
  console.log(listIntegration)

  const onChangeFilter = ({ name, value }) => {
    console.log('{ name, value }', { name, value })
    let tmpListIntegration = value.includes(1) || !value.length ? storeListIntegration : storeListIntegration.filter(item => {
      const mapContentId = item.customTags.map(tag => tag.contentID)
      return value.some(val => mapContentId.includes(val))
    })

    setListIntegration(tmpListIntegration)
    setLoadMoreIdx(6)
  }

  const loadMoreHandler = () => {
    let tmpLoadMoreIdx = loadMoreIdx
    tmpLoadMoreIdx += 6
    setLoadMoreIdx(tmpLoadMoreIdx)
  }

  return <React.Fragment>
    <section className={classSection}>
      <div className="container">
        <div className="filter-wrap">
          <SelectC8 className="d-inline-block" data={integrationOpts} onChange={onChangeFilter} />
        </div>

        <div className="row listing-wrap">
          {listIntegration
            .filter((item, index) => index < loadMoreIdx)
            .map((post, index) => {
              return <div key={index} className="col-md-6 col-xl-4 case-col">
                < PostItem post={post} isIntegration={true} />
              </div>
            })
          }
        </div>

        {loadMoreIdx <= listIntegration.length - 1 && <div className="text-center">
          <a className="btn btn-load-more" onClick={loadMoreHandler}>
            <span>Load More</span>
          </a>
        </div>}
      </div>
    </section>
  </React.Fragment>
}