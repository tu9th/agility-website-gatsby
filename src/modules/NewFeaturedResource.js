import React from 'react';
import { renderHTML } from '../agility/utils'
import Spacing from './Spacing';

import ResponsiveImage from '../components/responsive-image.jsx'

import './NewFeaturedResource.scss'


const NewFeaturedResource = ({ item }) => {
  const { image, resourceTypeName, title, uRL, textblob, fileDownload } = item?.customFields?.featuredResource?.customFields
	return (
    <>
    <section className="new-feature-res ps-rv">
    <div className="space-50 space-dt-70"></div>
      <div className="container ps-rv z-2 bg">
        <div className="row">
          <div className="col col-12 col-lg-6">
            <div className="resource-lp-left max-w-470 ps-rv last-mb-none">
              <ResponsiveImage img={image} />
            </div>
          </div>
          <div className="col col-12 col-lg-6">
            <div className="d-table w-100 h-100 resource-lp-right">
              <div className="d-table-cell align-middle">
                { resourceTypeName &&
                  <h5>{resourceTypeName}</h5>
                }
                {
                  title &&
                  <h2 className="h1">{title}</h2>
                }
                {
                  textblob &&
                  <div dangerouslySetInnerHTML={renderHTML(textblob)}></div>
                }
                { fileDownload && fileDownload.url &&
                  <a href={fileDownload.url} className="btn mb-0">Download</a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Spacing item={item}/>
    </>
	);
}

export default NewFeaturedResource;
