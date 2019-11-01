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
import Post from '../../components/Post';

import {Slider} from '../../local-react-components/blocks/posts-slider';
import './style.scss';

import {withPostOptions,withSliderPosts} from './resolvers'

import Placeholder from './placeHolder';
import InspectorControls from './inspectorControls';
// import {withWpColor} from '../../components/colors';
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
			sliderPosts,
		} = props;

		const { 
			postsToShow,
		} = attributes;
		
		const exerptEl = useRef();
		
		const hasPosts = Array.isArray( sliderPosts ) && sliderPosts.length;

		const displayPosts = sliderPosts.length > postsToShow ?
			sliderPosts.slice( 0, postsToShow ) :
			sliderPosts;

		// if ( ! hasPosts ) {
		// 	return (
		// 		<Fragment>
		// 			<InspectorControls key='inspectors' {...props} />
		// 			<Placeholder key='holder' sliderPosts={sliderPosts} />

		// 		</Fragment>
		// 	);
		// }

		return (
			<Fragment > 
				<InspectorControls key='inspectors' {...props} />
				<BlockControls key='blockControls' />
				<Slider key='slider' {...props} {...attributes} exerptEl={exerptEl} Block={Block} Post={Post} />

			</Fragment> 
		);		
	}
);

const EditFunc = compose([
	withPostOptions,
	withSliderPosts,
	// withColors('textColor'),
	// withColors('accentColor'),	
	// withWpColor('textColor'),
	// withWpColor('accentColor'),
	withWpColors('textColor','accentColor'),
	withMouseNavigation,
])( PostSliderEdit );

export default EditFunc;
