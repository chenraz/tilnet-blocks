/**
 * Post Slider Edit
 * Base on latest-posts block
 */

/**
 * External dependencies
 */

import { Fragment,useRef } from 'react';


const { __ } = wp.i18n;
const {
	BlockControls,
	withColors,
} = wp.blockEditor;
const { compose } = wp.compose;


/**
 * Internal Dependencies
 */


import Block from './block';
import Post from '../../local-react-components/blocks/posts-slider/Post'
import Excerpt from '../../local-react-components/blocks/posts-slider/Excerpt'

import Slider from '../../local-react-components/blocks/posts-slider/slider';
import './style.scss';

// import {withPostOptions,withPosts} from './resolvers'
import {withPostOptions,withPosts} from '../../utils/resolvers'


// import InspectorControls from './inspectorControls';
import PostsControls from '../../components/PostsControls'
import {withWpColors} from '../../components/colors';


import withMouseNavigation from '../../components/mouseNavigation';


/**
 * 
 * @param {*} props 
 */
const PostSliderEdit = (
	(props) => {

		const { 
			attributes, 
			posts: sliderPosts,
		} = props;

		const { 
			postsToShow,
		} = attributes;
		
		// const exerptEl = useRef();
		
		const hasPosts = Array.isArray( sliderPosts ) && sliderPosts.length;

		const displayPosts = sliderPosts.length > postsToShow ?
			sliderPosts.slice( 0, postsToShow ) :
			sliderPosts;

		return (
			<Fragment > 
				<PostsControls key='inspectors' {...props} />
				<BlockControls key='blockControls' />
				<Slider key='slider' {...props} {...attributes} Block={Block} Post={Post} Excerpt={Excerpt}/>

			</Fragment> 
		);		
	}
);

const EditFunc = compose([
	withPostOptions,
	withPosts,
	withWpColors('textColor','accentColor'),
	withMouseNavigation,
])( PostSliderEdit );

export default EditFunc;
