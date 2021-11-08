import React from 'react';
import {  graphql, StaticQuery } from "gatsby"
import * as StringUtils from "../utils/string-utils"
import ResponsiveImage from '../components/responsive-image';
import { Link } from "gatsby"
import './NewPostsFeatured.scss'
import Spacing from './Spacing'

const NewPostsFeatured = ({ item }) => {
	let posts = item?.customFields?.posts;
	posts.forEach(p => {
		let excerpt = p.customFields.excerpt;
		if (excerpt) {
			p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
		}

		p.url = "/resources/posts/" + p.customFields.uRL;
	});
	return <section className="mod-new-posts-featured">
		<div className="container">
			<div className="text-center heading last-mb-none">
				<h2>{item?.customFields?.title}</h2>
			</div>
			<section className="mod-space space-20 space-dt-50 "></section>

			<div className="row">
				{posts.map(post => {
					return <div className="posts-feature-item-col flex col-12 col-lg-4" key={`post-feature-${post.contentID}`}>
						<div className="posts-feature-item-wrap flex h-100 d-flex transition-25 ps-rv">
							{post?.customFields?.postImage && <div className="image flex-0-0">
								<ResponsiveImage img={post.customFields.postImage} breaks={[{ h: 241, max: 800 }, { h: 241, min: 800 }, { h: 241, min: 1190 }]} />
							</div>}
							<div className="content-wrap text-white last-mb-none d-flex flex flex-column">
								<div className="content flex">
									<h3>{post.customFields.title}</h3>
									<p>{post.customFields.excerpt}</p>
								</div>
								<div className="cta flex-0-0">
									<a className="btn btn-outline-white text-white">{ item?.customFields?.readMoreLabel || 'Read More' }</a>
								</div>
							</div>
							<Link to={post.url} className="ps-as"></Link>
						</div>
					</div>
				})}
			</div>
			<Spacing item={item}/>
		</div>
	</section>
}
export default NewPostsFeatured

