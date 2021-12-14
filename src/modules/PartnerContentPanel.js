import React, { useEffect, useRef, useState } from 'react';
import IntegrationDetailBanner from './IntegrationDetailBanner'
import ResponsiveImage from '../components/responsive-image.jsx'
import { animationElementInnerComponent } from '../global/javascript/animation';
import "./CaseStudyContentPanel.scss"
import "./NewPartnerContentPanel.scss"

import { Link } from 'gatsby';
import { renderHTML } from '../agility/utils';

const PartnerContentPanel = ({ item, dynamicPageItem }) => {
    const customFields = dynamicPageItem.customFields;
    // console.log('panel', dynamicPageItem);
    var bgColor = customFields.brandBGColor;
    var fgColor = customFields.brandFGColor;
    const [isIntegration, setIsIntegration] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const title = customFields.title
    const panelCopy = customFields?.contentPanelCopy

    const detectIntegration = () => {
        const detectIntegration = window.location.pathname.includes('/integrations')
        setIsIntegration(detectIntegration)
        setIsLoaded(true)
    }
    

    useEffect(() => {
        detectIntegration()
    }, []);


    /* animation module */
	const thisModuleRef = useRef(null)
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(thisModuleRef.current)
		}
		animationElementInnerComponent(thisModuleRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [isLoaded])

    return (
        <React.Fragment>
            {isLoaded && isIntegration && <IntegrationDetailBanner item={customFields} dynamicPageItem={dynamicPageItem}/>}
            {isLoaded && !isIntegration &&
            <>
            {/* // <section className="p-w case-study-content-panel" style={{ backgroundColor: bgColor }}>
            //     <div className="container-my">
            //         <div className="content-panel-flex">

            //             {item.imagePosition === 'left' &&

            //                 <div className="start-image">
            //                     {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
            //                 </div>

            //             }

            //             <div className="start-content">
            //                 <div className="sc-inner">
            //                     <div className="image">
            //                         {item.studyImage && item.studyImage != null ? <img src={item.studyImage.url} alt="" /> : null}
            //                     </div>
            //                     <h1 className="h1" style={{ color: fgColor }}>{item.title}</h1>
            //                     <div style={{ color: fgColor }} dangerouslySetInnerHTML={{ __html: item.contentPanelCopy }} />
            //                 </div>
            //             </div>



            //             {item.imagePosition === 'right' &&

            //                 <div className="start-image">
            //                     <div className="image-inner">
            //                         {item.image && item.image != null ? <img src={item.image.url + '?w=500&c=1'} alt={item.image.label} /> : null}
            //                     </div>
            //                 </div>

            //             }
            //         </div>
            //     </div>
            // </section> */}
            <section ref={thisModuleRef} className="new-partner-banner bg-17 animation">
                <div className="container anima-bottom">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-table w-100">
                                <div className="d-table-cell align-middle">
                                    <Link to={'/partners/implementation'} className="mb-45 d-block back-to-partner"><span className="icomoon icon-chevron-left"></span>Explore All Partners</Link>
                                    <div className="text-white last-mb-none">
                                        <h1>{title}</h1>
                                        <div className="part-banner-content" dangerouslySetInnerHTML={renderHTML(panelCopy)}></div>
                                        <p>
                                            {customFields.contactURL?.href &&
                                            <Link to={customFields.contactURL?.href} className="btn btn-primary">{customFields.contactURL?.text ?? 'Contact This Partner'}</Link>}

                                            {customFields.website?.href &&
                                            <Link to={customFields.website?.href} className="btn btn-visit-site">Visit Website</Link>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-rv">
                                <div className="partner-icon-bg d-flex align-items-end justify-content-end">
                                    <img src="/images/features/icon-Container.svg" alt="Icon" />
                                </div>
                                <div className="partner-banner-right d-flex align-items-center justify-content-center bg-white">
                                    <div className="partner-banner-logo">
                                    <ResponsiveImage img={customFields.partnerLogo} />
                                    {/* <img className="" src="/images/features/9th-logo.png" alt="9thWonder" /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
            }

            
        </React.Fragment>
    );
}

export default PartnerContentPanel;
