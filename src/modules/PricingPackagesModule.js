import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from 'gatsby'
import Spacing from './Spacing'
import { renderHTML } from '../agility/utils'
import HelperFunc from '../global/javascript/Helpers.js'
import './PricingPackagesModule.scss'
const groupByCondition = (list, keyGetter) => {
	const map = new Map()
	list.forEach((item) => {
		const key = keyGetter(item)
		const collection = map.get(key)
		if (!collection) {
			map.set(key, [item])
		} else {
			collection.push(item)
		}
	})
	return map
}

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
			allAgilityPricingCategories {
				nodes {
					customFields {
						category
					}
					contentID
				}
			}
			allAgilityPackageFeatures(sort: {fields: properties___itemOrder}) {
			  nodes {
				customFields {
				  isPrimary
				  title
					pricingCategory_ValueField
					description
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
						description
						yearlyCost
						yearlyCostLabel
						yearlyDescription
						yearlySaleCost
						displayInManager
						displayOnWebsite
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
			const pricingPackages = props.item.customFields.pricingPackages.referencename
			const listPricingPackages = queryData.allAgilityPricingPackages.nodes
				.filter(obj => { return obj.properties.referenceName === pricingPackages })
				.sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			// for(let i = 0; i < listPricingPackages.length - 1; i++) {
			// 	if (listPricingPackages[i].properties.itemOrder > listPricingPackages[i + 1].properties.itemOrder) {
			// 		const tam = listPricingPackages[i]
			// 		listPricingPackages[i] = listPricingPackages[i + 1]
			// 		listPricingPackages[i + 1] = tam
			// 	}
			// }
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
					&& obj.customFields.isPrimary === 'true'
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)
			/**
			 * group list packageFeature More by category
			 */
			const listPackageFeatureMore = queryData.allAgilityPackageFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureLabels
					&& obj.customFields.pricingCategory_ValueField !== undefined
					&& obj.customFields.pricingCategory_ValueField !== null
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)
			const groupByCategory = groupByCondition(listPackageFeatureMore, (item) => item.customFields.pricingCategory_ValueField)
			const listPricingByCategory = []
			groupByCategory.forEach((val, key) => {
				const categoryName = queryData.allAgilityPricingCategories.nodes.find(item => String(item.contentID) === key)?.customFields.category
				listPricingByCategory.push({
					category: {
						id: key,
						categoryName
					},
					listPackageFeature: val
				})
			})

			/**end */
			const viewModel = {
				item: props.item,
				dataQuery: {
					listPricingCategories,
					listPackageFeaturePrimary,
					listPricingByCategory,
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

const HeaderColumn = ({ priceType, description, title, costlabel, btnCta, btnCtaLabel, value, saleCost, hasPopular, isSaleOn }) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const popular = hasPopular && hasPopular === 'true' ? <span className={'most-popular'}><span className="icomoon icon-Star"></span>Most popular</span> : ''
	const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel

	const [salCostHeight, setSalCostHeight] = useState(0)
	const saleCostRef = useRef(null)

	/* set height for sale override cost Element */
	useEffect(() => {
		let h = 0
		if (saleCost) {
			h = saleCostRef.current.scrollHeight
		}
		setSalCostHeight(h)
	}, [saleCost])
	return (
		<div className={'price-head ps-rv type-' + classColor[Number(priceType) % 4]}>
			{isSaleOn == "true" &&
				<div className="sale-price-box">SALE</div>
			}
			<div className="price-type ps-rv">
				<span>{title}</span>
				{popular}
			</div>
			<div className="box-price">
				<div className="price-value last-mb-none">
					<div className="sale-price-cover ps-rv" style={{ height: `${salCostHeight}px` }}>
						<span className={`sale-override ${saleCost ? '' : 'opacity-0'}`} ref={saleCostRef}>${value}</span>
					</div>
					<span className={`transition-25 ${saleCost ? 'sale-price' : ''}`}>${saleCost ?? value}</span>
					{costlabel &&
						<p>
							{costlabel}
						</p>
					}
				</div>
				<div>
					<div className="description last-mb-none" dangerouslySetInnerHTML={renderHTML(description)} >
					</div>
					{btnCta && btnCta.href && btnCta.href.length > 0 &&
						(
							<div>
								<a href={btnCta.href} target={btnCta.target} className="btn btn-arrow"><span>{btnTitle}</span>&nbsp;<span className="icomoon icon-arrow"></span></a>
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
}


const RowItem = ({ props, maxCol }) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const rowFields = props.customFields
	const title = rowFields.title
	const description = rowFields.description
	const CheckIsBoolean = ({ textVal, checkedVal }) => {

		if ((textVal && checkedVal) || (textVal && !checkedVal)) {
			return <span dangerouslySetInnerHTML={{ __html: textVal }}></span>
		}
		if (!textVal && checkedVal) {
			return (checkedVal === 'true' ? <span className="icomoon icon-check-bg"><span className="path1"></span><span className="path2"></span></span> : <span>-</span>);
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
				{title &&
					<td colSpan="5" className="pr-sub-title" dangerouslySetInnerHTML={{ __html: title }}></td>
					// <td colSpan="5" className="pr-sub-title">
					// 	{title}
					// </td>
				}
			</tr>
			<tr>
				{title &&
					// <td dangerouslySetInnerHTML={{__html: title}}></td>
					<td>
						{/* {title} */}
						<span dangerouslySetInnerHTML={{ __html: title }}></span>
						{description &&
							<div className="content-catelogy last-mb-none" dangerouslySetInnerHTML={{ __html: description }}></div>
						}
					</td>
				}
				{rowFeatures && rowFeatures.length > 0 &&
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
		if (featureObj.itemID) {
			const listVal = listPackageFeatureValues.filter(val => {
				return val.customFields.packageFeature?.contentid === featureObj?.itemID
			})
			for (let i = 0; i < listPricingPackages.length; i++) {
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
			widthSaleText: 'auto'
		}
		this.pinHeaderTable = this.pinHeaderTable.bind(this)
		this.textSaleRef = React.createRef(null)

	}

	showMoreAction() {
		this.setState({ showMore: !this.state.showMore });
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
			if (window.innerHeight < 673 && window.innerWidth < 767) {
				header = 0
			}
			trigger = scrollTop + header
			if (trigger > rootOffset) {
				pinEle.classList.add('table-pin');
				virtual.style.height = pinEle.clientHeight + 'px'
				if (trigger + pinEle.clientHeight < listOffset) {
					pinEle.style.top = header + 'px';
				} else {
					pinEle.style.top = listOffset - pinEle.clientHeight - scrollTop + 'px';
				}
			} else {
				pinEle.classList.remove('table-pin')
				virtual.style.height = '';
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
			this.setState({ isMonthly: true })
		} else {
			this.setState({ isMonthly: false })
		}
	}
	setheightTable() {
		let table = document.querySelectorAll('.item-price-catelogy:not(.hidden) .table-togger')
		Array.from(table).forEach((item, index) => {
			let content = item.querySelector('table').offsetHeight
			item.style.height = content + 'px'
		})
	}
	toggerTable() {
		let trigger = document.querySelectorAll('.trigger-catelogy')
		Array.from(trigger).forEach((item, index) => {
			item.addEventListener('click', (e) => {
				const parent = e.currentTarget.parentElement
				const wrapT = parent.querySelector('.table-togger')
				const table = wrapT.querySelector('table').offsetHeight
				if (parent.classList.contains('hidden')) {
					parent.classList.remove('hidden')
					wrapT.style.height = table + 'px'
				} else {
					parent.classList.add('hidden')
					wrapT.style.height = 0
				}
			})
		})
	}
	componentDidMount() {
		let oldWidth = window.innerWidth
		this.pinHeaderTable();
		this.setheightTable()
		this.toggerTable()
		this.setState({ loaded: true });
		this.setState({ isMonthly: true })
		const interCount = 0;
		const inter = setInterval(() => {
			if (interCount > 9) {
				clearInterval(inter);
			}
		}, 200)

		/* set Width sale Text */
		const textSaleElm = this.textSaleRef.current.querySelector('span')
		const w = textSaleElm ? textSaleElm.offsetWidth : 0
		this.setState({ widthSaleText: w })


		window.addEventListener('scroll', () => {
			this.pinHeaderTable()
			this.setheightTable()
		})
		window.addEventListener('resize', () => {
			if (oldWidth !== window.innerWidth) {
				oldWidth = window.innerWidth;
			}
		});
	}

	componentDidUpdate(prevProps, prevState) {
		this.pinHeaderTable();

		/* set Width sale Text Month or Year */
		if (prevProps.textSale !== this.props.textSale || prevProps.textSaleYearly !== this.props.textSaleYearly || prevState.isMonthly !== this.state.isMonthly) {
			const textSaleElm = this.textSaleRef.current.querySelector('span')
			const w = textSaleElm ? textSaleElm.offsetWidth : 0;
			this.setState({ widthSaleText: w });
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.pinHeaderTable)
	}

	render() {
		const dataQuery = this.props.dataQuery
		const fields = this.props.item.customFields
		const btnShowMore = fields.showmoretext
		const btnShowLess = fields.showlesstext
		const primaryFeaturesTitle = fields.primaryFeaturesTitle
		const secondaryFeaturesTitle = fields.secondaryFeaturesTitle
		const textSale = fields?.saleOnText
		const textSaleYearly = fields?.saleOnTextYearly
		const title = fields?.comparePackagesTitle
		const headerList = dataQuery.listPricingPackages
		const category = dataQuery.listPricingCategories
		const rowListShow = filterAllowRow(dataQuery.listPackageFeaturePrimary, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx} />
			)
		})

		const listCategory = dataQuery.listPricingByCategory.map((item, index) => {
			const category = item.category.categoryName
			const listFeature = item.listPackageFeature
			const rowListHidden = filterAllowRow(listFeature, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
				return (
					<RowItem props={row} maxCol={headerList.length} key={idx} />
				)
			})
			return (
				<div className="item-price-catelogy" key={index}>
					<div className="trigger-catelogy" >
						<h3>
							{category && category}
						</h3>
						<span className="icomoon icon-keyboard_arrow_right"></span>
					</div>
					<div className="table-togger">
						<table>
							<tbody>
								{rowListHidden}
							</tbody>
						</table>
					</div>
				</div>
			)
		})
		const rowListHidden = filterAllowRow(dataQuery.listPackageFeatureMore, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx} />
			)
		})
		const ShowTilePin = headerList.length ? headerList.map((label, idx) => {
			const classColor = ['free', 'standard', 'pro', 'enterprise']
			const fieldLabel = label.customFields
			const title = fieldLabel.title
			const btnCta = fieldLabel.cTAButton
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel
			return (
				<td key={idx}>
					<div>
						{/* {title === 'Developer' ? 'Free' : title} */}
						{title}
						{btnCta && btnCta.href && btnCta.href.length > 0 &&
							(
								<a href={btnCta.href} target={btnCta.target} className={`d-none btn btn-arrow btn-${classColor[idx % 4]}`}><span>{btnTitle}</span>&nbsp;<span className="icomoon icon-arrow"></span></a>
							)
						}
					</div>
				</td>
			)
		}) : []

		/* List Header Column */
		const listHeaderColumn = headerList.length ? headerList.map((label, idx) => {
			const fieldLabel = label.customFields
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnCta = fieldLabel.cTAButton
			let cost = fieldLabel.cost
			let costLabel = fieldLabel.costLabel
			const isMostPopular = fieldLabel.isMostPopular
			const title = fieldLabel.title
			let saleCost = fieldLabel.saleCost
			let isSaleOn = fieldLabel.isSaleOn
			let description = fieldLabel.description
			if (isSaleOn != "true") saleCost = null
			if (this.state.isMonthly === false) {
				let costY = fieldLabel.yearlyCost
				if (costY !== null) {
					cost = costY
				}
				let descriptionY = fieldLabel.yearlyDescription
				if (descriptionY !== null) {
					description = descriptionY
				}
				let costLabelY = fieldLabel.yearlyCostLabel
				if (costLabelY !== null) {
					costLabel = costLabelY
				}
				let saleCostY = fieldLabel.yearlySaleCost
				if (saleCostY !== null) {
					saleCost = saleCostY
				}
			}

			return (
				<div className="col-md-6 col-xl-3" key={idx}>
					<HeaderColumn priceType={idx} description={description} title={title} costlabel={costLabel} btnCta={btnCta} btnCtaLabel={btnCtaLabel} value={cost} saleCost={saleCost} hasPopular={isMostPopular} isSaleOn={isSaleOn} />
				</div>
			)
		}) : []

		const BlockPriceDesktop = (
			<div className="price-desktop">
				<div className="virtual-pin-bar" style={{ height: `${this.state.isPin ? document.querySelector('.table-header').clientHeight + 'px' : ''}` }}></div>
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
					{listCategory && listCategory.length > 0 &&
						listCategory
					}
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
								<div className={`item-t-price ${(this.state.isMonthly == false) ? `is-active ` : ``}`} onClick={() => { this.changeTooger(false) }}>
									Yearly
							</div>
								<div className="overlay-active">

								</div>
							</div>
							<span className="transition-25 ps-rv overflow-hidden sale-text text-purple"
							style={{ width: `${this.state.widthSaleText !== 'auto' ? this.state.widthSaleText + 'px' : this.state.widthSaleText}` }}
							ref={this.textSaleRef}>
								{this.state.isMonthly && textSale &&
									<span className="text-purple" dangerouslySetInnerHTML={renderHTML(textSale)}></span>
								}
								{!this.state.isMonthly && textSaleYearly &&
									<span className="text-purple" dangerouslySetInnerHTML={renderHTML(textSaleYearly)}></span>
								}
							</span>

						</div>
						<div className="wrap-price-head">
							<div className="row">
								{listHeaderColumn && listHeaderColumn.length > 0 &&
									listHeaderColumn
								}
							</div>
						</div>
						<div className="content-pricing last-mb-none text-center">
							{title &&
								<h2>{title}</h2>
							}
						</div>
						{
							BlockPriceDesktop
						}
					</div>
				</section>
				<Spacing item={this.props.item} />
			</React.Fragment>
		);
	}
}

export default ModuleWithQuery