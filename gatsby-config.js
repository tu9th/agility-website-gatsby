require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	apiKey: process.env.AGILITY_API_KEY,
	isPreview: process.env.AGILITY_API_ISPREVIEW === "true"
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	flags: {
		DEV_SSR: false,
		PRESERVE_WEBPACK_CACHE: true,
		PRESERVE_FILE_DOWNLOAD_CACHE: true
	},
	siteMetadata: {
		title: "Agility CMS",
		siteUrl: `https://agilitycms.com`,

	},
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-netlify`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		`gatsby-plugin-gatsby-cloud`,
		`gatsby-plugin-loadable-components-ssr`,
		{
			//the name of the plugin
			resolve: "@agility/gatsby-source-agilitycms",
			//the options for our plugin
			options: {
				//your Agility Content Fetch API Guid
				guid: agilityConfig.guid,
				//your Agility Content Fetch API Key
				apiKey: agilityConfig.apiKey,
				//set this to true if you are using the preview API Key
				isPreview: agilityConfig.isPreview,
				//set this to true to see expanded traces in the build logs
				debug: false,
				//the languages you want to source content for
				languages: [{
					// The name of the language code
					name: "English",
					// The actual language code set in Agility CMS
					code: "en-ca",
					// The name to be used in the URL path that represents the current language
					path: "en"
				}],
				// The channels you want to include
				channels: [{
					// The reference name for the website channel as it is defined in Agility CMS
					referenceName: "website"
				}],
				//the page template that will be used to render Agility CMS pages
				masterPageTemplate: "./src/AgilityPage.js"
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-NJW8WMX", //Agilitycms.com - Gatsby Container
				includeInDevelopment: false
			},
		},
		{
			resolve: 'gatsby-plugin-intercom-spa',
			options: {
				app_id: 'ipjo8vwm',
				include_in_development: false,
				delay_timeout: 4000
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/`,
				entryLimit: 1000,
				query: `
				{
					allSitePage: allAgilitySitemapNode(
						filter: {visible: {sitemap: {eq: true}}, redirect: {url: {eq: null}}, isFolder: {eq: false}}
					  ) {
						nodes {
						  path
						}
					  }
				  }`,
				  resolveSiteUrl: () => "https://agilitycms.com",
				serialize: (p) => {
					let path = p.path
					if (path === "/home") {
						return {
							url: `/`,
							changefreq: `daily`,
							priority: 0.7
						}
					} else {
						return {
							url: `${p.path}/`,
							changefreq: `daily`,
							priority: 0.7
						}
					}
				}

			}
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
				{
				  site {
					siteMetadata {
					  title
					  siteUrl
					  site_url: siteUrl
					}
				  }
				}
			  `,
				feeds: [
					{
						serialize: ({ query: { site, allAgilityBlogPost } }) => {
							return allAgilityBlogPost.nodes.map(node => {
								return {
									title: node.customFields.title,
									description: node.customFields.excerpt,
									date: node.customFields.date,
									url: 'https://agilitycms.com/resources/posts/' + node.customFields.uRL,
									guid: node.id,
									enclosure: node.customFields.postImage && {
										url: node.customFields.postImage.url
									},

								}
							})
						},
						query: `
					{
						allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}, limit: 100) {
							nodes {
								id
								customFields {
									title
									excerpt
									uRL
									date
									postImage {
										url
										label
									}
								}
							}
						  }
					}
				  `,
						output: "/posts.xml",
						title: "Agility CMS Blog",
					},
				],
			},
		},


	],
}
