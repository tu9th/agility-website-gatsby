/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// import './src/assets/styles/global.scss'
// import './src/assets/javascripts/app'
const AnimationScrollPage = require('./src/global/javascript/animation').default
const agility = require('@agility/content-fetch')
const handle = () => {
  try {
    const api = agility.getApi({
      guid: '80dc0987-be84-4405-a572-aba199832f68',
      apiKey: 'defaultPreview.6ddcb15cfad15bc5b0df1da3cd019f5dc009d1e9a11fa83c2cbdb7886c687dba',
      isPreview: true
    });
    api.getGallery({
      galleryID: 3
    })
    .then(function(gallery) {
      console.log(gallery);
    })
  } catch(err) {
    console.log('err', err)
  }
}
handle()
// exports.onRouteUpdate = () => {
//   AnimationScrollPage()
// }
exports.onClientEntry = () => {
  if (!Math.trunc) {
    Math.trunc = function (n) {
      return n < 0 ? Math.ceil(n) : Math.floor(n);
    };
  }
  if (!Math.sign) {
    Math.sign = function (x) {
      return ((x > 0) - (x < 0)) || +x;
    };
  }

  /* loading animattion page */
  AnimationScrollPage()
}
