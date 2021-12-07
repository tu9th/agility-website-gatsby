import React from 'react';
import { renderHTML } from '../agility/utils'
import PostItemImageVertical from '../modules/DownloadableItem'
import './NewWebinarDowload.scss'
import Spacing from './Spacing';
import { Link } from 'gatsby'

const NEWSocialSubscribe = ({ item }) => {
	return (
    <>
    <section className="new-subscribe">
      <div className="container ps-rv bg">
      </div>
    </section>
    <Spacing item={item}/>
    </>
	);
}

export default NEWSocialSubscribe;
