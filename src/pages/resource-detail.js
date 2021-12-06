import React, { useEffect } from 'react'
import LayoutTemplate from "../components/NewLayoutTemplate"
import NewGlobalHeader from '../components/NewGlobalHeader'
import NewGlobalFooter from '../components/NewGlobalFooter'
import SEO from '../components/SEO'
import PostItem from '../modules/PostItem'
import PostItemImageVertical from '../modules/DownloadableItem'


const ResourceDetail = () => {
  var classes = 'main-content main page'
  return(
    <LayoutTemplate>
    <SEO page={{ seo: {} }} />
    <NewGlobalHeader />
    <main className={classes}>
      <div>
        <h1>Hello</h1>
      </div>

    </main>
    <NewGlobalFooter />
  </LayoutTemplate>
  )
}

export default ResourceDetail