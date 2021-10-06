import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet"
import { renderHTML } from '../agility/utils'
import './IntegrationDetailBanner.scss'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'


const HasImg = ({ img, isHomePage, page }) => {

	const [isLoaded, setIsLoaded] = useState(false)

	// const dataLayerList = [layer0, layer1, layer2, layer3, layer4]
	// let listLottieOptions = []

	// for (let i = 0; i < 5; i++) {
	// 	let opts = {
	// 		loop: false,
	// 		autoplay: isLoaded,
	// 		// animationData: dataLayerList[i],
	// 		path: `/js/layer_${i}.json`,
	// 		rendererSettings: {
	// 			preserveAspectRatio: 'xMidYMid slice'
	// 		}
	// 	}
	// 	listLottieOptions.push(opts)
	// }

	useEffect(() => {
		setIsLoaded(true)
	}, [])
  const url = '/images/integration-banner.png'

	return (
		<React.Fragment>
				<Helmet>
					<link rel="preload" as="image" href={url} media="screen" />
				</Helmet>
			<img
				src={url}
				alt='image video' className='anima-right' />

		</React.Fragment>
	)
}

const ImgRender = React.memo(HasImg)


const IntegrationDetailBanner = ({ item }) => {
	const heading = 'Google Analytics'
	const des = 'Google Analytics is a service provided by Google to track all of the activity that happens on your website or app. Track all the activity from your Pages and Content from Agility CMS, including customer journeys, conversions, eCommerce and more.'
	const breadcrumb = 'Explore All Integrations'
	// const classSection = 'module mod-banner mod-integration-detail-banner animation bg-46 text-white'
	const array = []
	const [isHomePage, setIsHomePage] = useState(false);

	let classAniImg = 'col-md-6 col-lg-7 col-right-lr anima-right d-flex align-items-center justify-content-end'
	let imgModule

	const bannerRef = useRef(null)
	const [isLottieLoad, setIsLottieLoad] = useState(false)

	/*  */
	const detectHomePage = () => {
		const detectHome = ['/new-home', '/new-home/', '/'].includes(window.location.pathname)
		setIsHomePage(detectHome)
	}

	const appenLottie = (callback = function () { }) => {
		const script = document.createElement("script");
		script.id = 'lottie-script'
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.7/lottie_light_html.min.js";
		script.async = true;
		document.body.appendChild(script);
		script.onload = () => {
			callback()
		}
	}
	const init = () => {
		callAnimation()
		window.addEventListener('resize', callAnimation);
	}

	/*  */
	const callAnimation = () => {
		let banner = bannerRef.current
		if (banner.classList.contains('mod-banner') && window.innerWidth >= 1025 && !banner.classList.contains('done-ani')) {
			if (!document.querySelectorAll('#lottie-script').length) {
				appenLottie(() => { setIsLottieLoad(true) })
			} else {
				setIsLottieLoad(true)
			}
		}
	}
	const loadAni = () => {
		let temp = 0
		Array.from(document.querySelectorAll('.ani-banner')).forEach((item, index) => {
			array[index] = window.lottie.loadAnimation({
				container: item,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: `/js/layer_${index}.json`
			})
			if (index === 2 || index === 3) {
				array[index].addEventListener('loaded_images', function (e) {
					temp++
					if (temp === 2) {
						bannerRef.current?.classList.add('done-ani')
					}
				})
			}
		})

		setTimeout(() => {
			array.forEach(element => element.play());
		}, 600)
	}

	const initParallax = () => {
		if (document.getElementsByClassName('ani-banner').length) {
			parallaxBanner()
		}
	}
	const parallaxBanner = () => {
		const doc = document.documentElement;
		const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const item0 = document.getElementsByClassName('ani-banner')[0]
		const item1 = document.getElementsByClassName('ani-banner')[1]
		const item2 = document.getElementsByClassName('ani-banner')[2]
		const item3 = document.getElementsByClassName('ani-banner')[3]
		const item4 = document.getElementsByClassName('ani-banner')[4]
		item0.style.transform = 'translateY(' + -(top / 6) + 'px)'
		item1.style.transform = 'translateY(' + -(top / 5) + 'px)'
		item2.style.transform = 'translateY(' + -(top / 3) + 'px)'
		item3.style.transform = 'translateY(' + -(top / 2.3) + 'px)'
		item4.style.transform = 'translateY(' + -(top / 3.5) + 'px)'
	}

	useEffect(() => {
		detectHomePage()

		/* animation module */
		const scrollEventFunc = () => {
			animationElementInnerComponent(bannerRef.current)
		}
		animationElementInnerComponent(bannerRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, []);

	useEffect(() => {
		// detectHomePage()
		if (imgModule && isHomePage) {
			init()
			if (!navigator.userAgent.match(/Trident\/7\./)) {
				window.addEventListener('scroll', initParallax);
			}
		} else {
			window.removeEventListener('scroll', initParallax);
		}

		return () => {
			window.removeEventListener('resize', callAnimation);
			window.removeEventListener('scroll', initParallax);
		}
	}, [isHomePage, imgModule]);

	/* catch running lottie animation */
	useEffect(() => {
		if (isLottieLoad) {
			loadAni()
		}
	}, [isLottieLoad])

	return (
		<React.Fragment>
			<section className='module mod-integration-detail-banner animation bg-46 text-white' ref={bannerRef}>
				<div className="container">
					<div className='row h1-big'>
						<div className="col-md-6 col-lg-5 banner-col-text large-paragraph anima-left d-flex">
              <div className="link box-message">
                <p>
                  <a className="link-line line-purple" href="">{breadcrumb}</a>
                </p>
              </div>
              <div className="content-wrap">
                <h1>{heading}</h1>
                {des &&
                  <div dangerouslySetInnerHTML={renderHTML(des)} className="description"></div>
                }
              </div>
						</div>
            <div className={classAniImg}>
							<div className='text-center text-md-left ps-rv img-banner d-flex justify-content-center align-items-center'>
								<ImgRender img={imgModule} isHomePage={isHomePage} />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <Spacing item={item} /> */}
		</React.Fragment>
	);
}

export default IntegrationDetailBanner;


