import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from 'gatsby'
import Spacing from './Spacing'
import HelperFunc from '../global/javascript/Helpers.js'
import './PricingPackagesModule.scss'
const ModuleWithQuery = props => (
	<StaticQuery
		query={graphql`
		query getPricingItems {
			allAgilityPackageFeatureValues(sort: {fields: properties___itemOrder}) {
			  nodes {
				customFields {
				  packageFeature {
					contentid
				  }
				  pricingPackage {
					contentid
				  }
				  textValue
				  trueFalseValue
				}
				properties {
				  itemOrder
				  referenceName
				}
				itemID
			  }
			}
			allAgilityPackageFeatures(sort: {fields: properties___itemOrder}) {
			  nodes {
				customFields {
				  isPrimary
				  title
				}
				properties {
				  referenceName
				  itemOrder
				}
				itemID
			  }
			}
			allAgilityPricingPackages(sort: {fields: properties___itemOrder}, filter: {customFields: {displayOnWebsite: {eq: "true"}}}) {
			  nodes {
					customFields {
						cTAButtonLabel
						cost
						saleCost
						costLabel
						isMostPopular
						isSaleOn
						title
						cTAButton {
						target
						href
						text
						}
					}
					properties {
							referenceName
							itemOrder
						}
					itemID
					}
				}
				allAgilityPricingCategories {
					nodes {
						customFields {
							category
						}
						id
					}
				}
		  }


		`}
		render={queryData => {
			/**pricing header */
			const pricingPackages = props.item.customFields.pricingPackages.referencename
			const listPricingPackages = queryData.allAgilityPricingPackages.nodes
				.filter(obj => { return obj.properties.referenceName === pricingPackages})
				.sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			// // order
			// for(let i = 0; i < listPricingPackages.length - 1; i++) {
			// 	if (listPricingPackages[i].properties.itemOrder > listPricingPackages[i + 1].properties.itemOrder) {
			// 		const tam = listPricingPackages[i]
			// 		listPricingPackages[i] = listPricingPackages[i + 1]
			// 		listPricingPackages[i + 1] = tam
			// 	}
			// }
			/**end */
			/**row value */
			const listPricingCategories = queryData.allAgilityPricingCategories.nodes
			const packageFeatureValues = props.item.customFields.packageFeatureValues.referencename
			const listPackageFeatureValues = queryData.allAgilityPackageFeatureValues.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureValues
			})

			const packageFeatureLabels = props.item.customFields.packageFeatureLabels.referencename
			const listAllPackageFeature = queryData.allAgilityPackageFeatures.nodes
			const listPackageFeaturePrimary = queryData.allAgilityPackageFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureLabels
						&& obj.customFields.isPrimary !== undefined
						&& obj.customFields.isPrimary !== null
						&& obj.customFields.isPrimary=== 'true'
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			const listPackageFeatureMore = queryData.allAgilityPackageFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureLabels
				&& ( obj.customFields.isPrimary === undefined
					|| obj.customFields.isPrimary === null
					|| obj.customFields.isPrimary === 'false')
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			/**end */
			const viewModel = {
				item: props.item,
				dataQuery: {
					listPricingCategories,
					listPackageFeaturePrimary,
					listPackageFeatureMore,
					listPackageFeatureValues,
					listPricingPackages,
				}
			}
			return (
				<PricingPackagesModule2 {...viewModel} />
			);
		}}
	/>
)

const HeaderColumn = ({ priceType, title, label, btnCta, btnCtaLabel, value, saleCost, hasPopular }) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const popular = hasPopular && hasPopular === 'true' ? <span className={'most-popular'}><span className="icomoon icon-Star"></span>Most Popular</span>: ''
	const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel

	return (
		<div className={'price-head ps-rv type-' + classColor[Number(priceType) % 4] }>
			<div className="sale-price">SALE</div>
			<div className="price-type ps-rv">
				<span>{ title }</span>
				{ popular }
			</div>
			<div>
				<div className="price-value last-mb-none">
					{ !saleCost  &&
						<>
						<span>${ value }</span>
						</>
					}
					{ saleCost  &&
					<>
						<span className="sale-override">${ value }</span>&nbsp;
						<span className="sale-price">${ saleCost }</span>
					</>
					}
					<p>Per month – Paid annually</p>
				</div>
				<div className="description last-mb-none">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
				</div>
				{ btnCta && btnCta.href && btnCta.href.length > 0 &&
					(
						<div>
							<a href={btnCta.href} target={btnCta.target} className="btn btn-arrow">{btnTitle} <span className="icomoon icon-arrow"></span></a>
						</div>
					)
				}
			</div>
		</div>
	);
}


const RowItem = ({props, maxCol}) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const rowFields = props.customFields
	const title = rowFields.title
	const CheckIsBoolean = ({textVal, checkedVal}) => {

		if ((textVal && checkedVal) || (textVal && !checkedVal) ) {
			return <span dangerouslySetInnerHTML={{__html:textVal}}></span>
		}
		if (!textVal && checkedVal) {
			return  (checkedVal === 'true' ? <span className="icomoon icon-check-bg"><span className="path1"></span><span className="path2"></span></span> : <span>-</span>);
		}
	}
	const rowFeatures = props.features.map((el, idx) => {
		if (el !== 'none') {
			const featuresFields = props.features[idx].customFields
			return (
				<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
					<div>{<CheckIsBoolean textVal={featuresFields.textValue} checkedVal={featuresFields.trueFalseValue} />}</div>
				</td>
			)
		}
		return (
			<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
				<div><span>-</span></div>
			</td>
		)
	})
	return (
		<React.Fragment>
			<tr className="tr-show-mb">
			{ title &&
				// <td dangerouslySetInnerHTML={{__html: title}}></td>
				<td colSpan="5" className="pr-sub-title">
					{title}
				</td>
			}
			</tr>
			<tr>
				{ title &&
					// <td dangerouslySetInnerHTML={{__html: title}}></td>
					<td>
						{title}
						<span>Lorem ipsum dolor sit amet, consectetur adipiscing.</span>
					</td>
				}
				{ rowFeatures && rowFeatures.length > 0 &&
					rowFeatures
				}
			</tr>
		</React.Fragment>
	);
}




const filterAllowRow = (listFilter, listPackageFeatureValues, listPricingPackages) => {
	return listFilter.map(feature => {
		const featureObj = Object.assign({}, feature)
		const listValPricing = []
		if(featureObj.itemID) {
			const listVal = listPackageFeatureValues.filter(val => {
				return val.customFields.packageFeature?.contentid === featureObj?.itemID
			})
			for(let i = 0; i < listPricingPackages.length; i++) {
				const orderByPricing = listVal.find(el => el.customFields.pricingPackage.contentid === listPricingPackages[i].itemID) || 'none'
				if (orderByPricing) {
					listValPricing.push(orderByPricing)
				}
			}
			featureObj.features = listValPricing
		}
		return featureObj
	})
}

const filterAllowColumn = (listFilterPrimary, listFilterMore, listPackageFeatureValues, listPricingPackages) => {
	return listPricingPackages.map(pricing => {
		const pricingObj = Object.assign({}, pricing)
		const itemID = pricingObj.itemID
		const listPrimary = listFilterPrimary.map(fil => {
			const filObj = Object.assign({}, fil)
			filObj.featureVal = listPackageFeatureValues.find(fe => {
				return fe.customFields.packageFeature?.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
			})
			return filObj
		})
		const listMore = listFilterMore.map(fil => {
			const filObj = Object.assign({}, fil)
			filObj.featureVal = listPackageFeatureValues.find(fe => {
				return fe.customFields.packageFeature?.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
			})
			return filObj
		})
		pricingObj.listPrimary = listPrimary
		pricingObj.listMore = listMore
		return pricingObj
	})
}

class PricingPackagesModule2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			showMore: false,
			isMobile: false,
			isPin: false,
			isMonthly: true,
		}
		this.pinHeaderTable = this.pinHeaderTable.bind(this)
	}

	showMoreAction() {
		this.setState({showMore: !this.state.showMore});
	}
	checkIsMobile() {
		// if (window.innerWidth <  1025) {
		// 	if(!this.state.isMobile) {
		// 		this.setState({isMobile: true})
		// 	}
		// } else {
		// 	if(this.state.isMobile) {
		// 		this.setState({isMobile: false})
		// 	}
		// }
	}
	checkShowHideSection() {
		// const section2 = document.querySelector('.show-hide-act');
		// const windowY = window.pageYOffset;
		// if (!this.state.isMobile) {
		// 	if (this.state.showMore) {
		// 		if (document.querySelector('html').classList.contains('chrome')) {
		// 			HelperFunc.animateScrollTop(windowY, 450);
		// 		}
		// 		setTimeout(() => {
		// 			section2.style.height = section2.scrollHeight + 'px';
		// 		}, 20)
		// 	} else {
		// 		setTimeout(() => {
		// 			section2.style.height = 0 + 'px'
		// 		}, 20)
		// 	}
		// }
	}

	equalHeightHeader() {
		const headerPrice = document.querySelectorAll('.price-head');
		let height = 0;
		let count = 0;
		headerPrice.forEach((e) => {
			e.style.height = ''
		})
		if (!this.state.isMobile) {
			headerPrice.forEach((e) => {
				if (height < e.clientHeight) {
					height = e.clientHeight;
					count++;
				}
			})
			if (count) {
				headerPrice.forEach((e) => {
					e.style.height = height + 'px'
				})
			}
		}
	}

	caculatePin(pinEle, $header, virtual, scrollArea) {
		let offsetPin
		let rootOffset
		let header
		let trigger
		let listOffset
		let scrollTop
		let packagePricing
		if (!this.state.isMobile) {

			rootOffset = virtual.offsetTop;
			scrollTop = window.pageYOffset;
			header = $header.clientHeight;
			offsetPin = virtual.offsetTop;
			packagePricing = document.querySelector('.pricing-package')
			listOffset = packagePricing.offsetTop + packagePricing.clientHeight - pinEle.clientHeight
			trigger = scrollTop + header
			if (trigger > rootOffset) {
				pinEle.classList.add('table-pin');
				pinEle.childNodes[0].classList.add('container');
				virtual.style.height = pinEle.clientHeight + 'px'
				console.log(trigger + pinEle.clientHeight,listOffset)
				if (trigger + pinEle.clientHeight < listOffset) {
					pinEle.style.top = $header.clientHeight + 'px';
				} else {
					pinEle.style.top = listOffset - pinEle.clientHeight - scrollTop + 'px';
				}
			} else {
				pinEle.classList.remove('table-pin')
				virtual.style.height = '';
				pinEle.childNodes[0].classList.remove('container');
			}
		}

	}

	pinHeaderTable(event) {
		const pinEle = document.querySelector('.table-header')
		const $header = document.querySelector('#header')
		const virtual = document.querySelector('.virtual-pin-bar')
		const scrollArea = document.querySelector('.price-desktop')

		this.caculatePin(pinEle, $header, virtual, scrollArea);
	}
	changeTooger(bool) {
		if (bool === true) {
			this.setState({isMonthly: true})
		} else {
			this.setState({isMonthly: false})
		}
	}
	componentDidMount() {
		let oldWidth = window.innerWidth
		this.checkIsMobile();
		this.pinHeaderTable();
		this.setState({loaded: true});
		this.setState({isMonthly: true})
		const interCount = 0;
		const inter = setInterval(() => {
			this.equalHeightHeader();
			if (interCount > 9) {
				clearInterval(inter);
			}
		}, 200)

		this.checkShowHideSection();
		window.addEventListener('scroll', this.pinHeaderTable)
		window.addEventListener('resize', () => {
			if (oldWidth !== window.innerWidth) {
				this.checkIsMobile();
				this.equalHeightHeader();
				oldWidth = window.innerWidth;
			}
		});
	}
	componentDidUpdate() {
		this.checkShowHideSection();
		this.pinHeaderTable();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.pinHeaderTable)
	}

	render () {
		const dataQuery = this.props.dataQuery
		const fields = this.props.item.customFields
		const btnShowMore = fields.showmoretext
		const btnShowLess = fields.showlesstext
		const primaryFeaturesTitle = fields.primaryFeaturesTitle
		const secondaryFeaturesTitle = fields.secondaryFeaturesTitle
		const headerList = dataQuery.listPricingPackages
		const category = dataQuery.listPricingCategories
		const rowListShow = filterAllowRow(dataQuery.listPackageFeaturePrimary, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx}/>
			)
		})
		const rowListHidden = filterAllowRow(dataQuery.listPackageFeatureMore, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx}/>
			)
		})
		const ShowTilePin = headerList.length ? headerList.map((label, idx) => {
			const classColor = ['free', 'standard', 'pro', 'enterprise']
			const fieldLabel = label.customFields
			const title = fieldLabel.title
			const btnCta = fieldLabel.cTAButton
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel
			return(
				<td key={idx}>
					<div>
						{title === 'Developer' ? 'Free' : title}
						{ btnCta && btnCta.href && btnCta.href.length > 0 &&
							(
								<a href={btnCta.href} target={btnCta.target} className={`d-none btn btn-arrow btn-${classColor[idx % 4]}`}>{btnTitle} <span className="icomoon icon-arrow"></span></a>
							)
						}
					</div>
				</td>
			)
		}):[]
		const listHeaderColumn = headerList.length ? headerList.map((label, idx) => {
			const fieldLabel = label.customFields
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnCta = fieldLabel.cTAButton
			let cost = fieldLabel.cost
			const costLabel = fieldLabel.costLabel
			const isMostPopular = fieldLabel.isMostPopular
			const title = fieldLabel.title
			let saleCost = fieldLabel.saleCost
			let isSaleOn = fieldLabel.isSaleOn
			if (isSaleOn != "true") saleCost = null
			if ( this.state.isMonthly === false) {
				cost = '10'
			}

			return (
				<div className="col-md-6 col-lg-3" key={idx}>
					<HeaderColumn priceType={idx} title={title} label={costLabel} btnCta={btnCta} btnCtaLabel={btnCtaLabel} value={cost} saleCost={saleCost} hasPopular={isMostPopular} />
				</div>
			)
		}) : []

		const listBtnColumn = headerList.length ? headerList.map((label, idx) => {
			const classColor = ['free', 'standard', 'pro', 'enterprise']
			const fieldLabel = label.customFields
			const btnCta = fieldLabel.cTAButton
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel
			return (
				<td key={idx}>
					{ btnCta && btnCta.href && btnCta.href.length > 0 &&
						(
							<a href={btnCta.href} target={btnCta.target} className={`btn btn-arrow btn-${classColor[idx % 4]}`}>{btnTitle} <span className="icomoon icon-arrow"></span></a>
						)
					}
				</td>
			)
		}) : []
		const BlockPriceDesktop = (
		<div className="price-desktop">
			<div className="virtual-pin-bar" style={{height: `${this.state.isPin ? document.querySelector('.table-header').clientHeight + 'px' : ''}`}}></div>
			<table className="table-header-pin table-header">
				<tbody>
					<tr>
						<td>
							<div className="text-pin d-none">
							All Features
							</div>
						</td>
						{ShowTilePin &&
							ShowTilePin
						}
					</tr>
				</tbody>
			</table>
			<div className="wrap-price-catelogy">
				<table className="table-1 item-price-catelogy">
					<tbody>
						{ rowListShow && rowListShow.length > 0 &&
								rowListShow
						}
					</tbody>
				</table>
				<div className="item-price-catelogy">
						<div className="trigger-catelogy">
							<h3>
							{ secondaryFeaturesTitle && secondaryFeaturesTitle}
							</h3>
							<span className="icomoon icon-keyboard_arrow_right"></span>
						</div>
						<table className={"table-2 "}>
							<tbody>
								{ rowListHidden && rowListHidden.length > 0 &&
									rowListHidden
								}
							</tbody>
						</table>
				</div>
			</div>
		</div>);


		return (
			<React.Fragment>
			<section className={`PricingPackagesModule pricing-package animation anima-fixed ${!this.state.loaded ? 'opacity-0' : ''}`}>
				<div className="container anima-bottom">
					<div className="wrap-togger-price d-flex justify-content-center align-items-center">
						<div className="togger-price">
							<div className={`item-t-price ${(this.state.isMonthly == true) ? `is-active ` : ``}`} onClick={() => { this.changeTooger(true) }}>
								Monthly
							</div>
							<div className={`item-t-price ${(this.state.isMonthly == false) ? `is-active ` : ``}`} onClick={() => {this.changeTooger(false)}}>
								Yearly
							</div>
							<div className="overlay-active">

							</div>
						</div>
						<span>Save up to 25%</span>
					</div>
					<div className="wrap-price-head">
					<div className="row">
							{ listHeaderColumn && listHeaderColumn.length > 0 &&
								listHeaderColumn
							}
					</div>
				</div>
				<div className="content-pricing last-mb-none text-center">
					<h2>Compare Packages</h2>
				</div>
					{
						BlockPriceDesktop
					}
				</div>
			</section>
				<Spacing item={this.props.item}/>
				</React.Fragment>
		);
	}
}

export default ModuleWithQuery