import React, { useEffect, useRef, useState } from 'react';
import IntegrationDetailBanner from './IntegrationDetailBanner'

import "./CaseStudyContentPanel.scss"
import "./NewPartnerContentPanel.scss"

import { Link } from 'gatsby';
import { renderHTML } from '../agility/utils';

const PartnerContentPanel = ({ item, dynamicPageItem }) => {
    item = dynamicPageItem.customFields;
    // console.log('panel', dynamicPageItem);
    var bgColor = item.brandBGColor;
    var fgColor = item.brandFGColor;
    const [isIntegration, setIsIntegration] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const title = item.title
    const panelCopy = item?.contentPanelCopy

    const detectIntegration = () => {
        const detectIntegration = window.location.pathname.includes('/integrations')
        setIsIntegration(detectIntegration)
        setIsLoaded(true)
    }
    

    useEffect(() => {
        detectIntegration()

        /* animation module */
        // const scrollEventFunc = () => {
        // 	animationElementInnerComponent(bannerRef.current)
        // }
        // animationElementInnerComponent(bannerRef.current)
        // window.addEventListener('scroll', scrollEventFunc)

        return () => {
            // window.removeEventListener('scroll', scrollEventFunc)
        }
    }, []);

    return (
        <React.Fragment>
            {isLoaded && isIntegration && <IntegrationDetailBanner item={item} dynamicPageItem={dynamicPageItem}/>}
            {isLoaded && !isIntegration && <section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>
                <div className="container-my">
                    <div className="content-panel-flex">

                        {item.imagePosition === 'left' &&

                            <div className="start-image">
                                {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
                            </div>

                        }

                        <div className="start-content">
                            <div className="sc-inner">
                                <div className="image">
                                    {item.studyImage && item.studyImage != null ? <img src={item.studyImage.url} alt="" /> : null}
                                </div>
                                <h1 className="h1" style={{ color: fgColor }}>{item.title}</h1>
                                <div style={{ color: fgColor }} dangerouslySetInnerHTML={{ __html: item.contentPanelCopy }} />
                            </div>
                        </div>



                        {item.imagePosition === 'right' &&

                            <div className="start-image">
                                <div className="image-inner">
                                    {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </section>}

            {/* <div className="space-100"></div>
            <section className="new-partner-banner bg-17">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-table w-100">
                                <div className="d-table-cell align-middle">
                                    <Link to={'#'} className="mb-35 d-block back-to-partner">Explore All Partners</Link>
                                    <div className="text-white">
                                        <h1>{title}</h1>
                                        <div className="" dangerouslySetInnerHTML={renderHTML(panelCopy)}></div>
                                        <p>
                                            <Link to={'#'} className="btn btn-primary">Contact This Partner</Link>
                                            <Link to={'#'} className="btn btn-visit-site">Visit Website</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-rv h-100">
                                <div className="partner-icon-bg d-flex align-items-end justify-content-end">
                                    <img src="/images/features/icon-Container.svg" alt="Icon" />
                                </div>
                                <div className="partner-banner-right h-100 d-flex align-items-center justify-content-center bg-white">
                                    <div className="partner-banner-logo">
                                    <img className="" src="/images/features/9th-logo.png" alt="9thWonder" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </React.Fragment>
    );
}

export default PartnerContentPanel;
