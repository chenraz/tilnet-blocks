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
} = wp.blockEditor;
const { compose } = wp.compose;


/**
 * Internal Dependencies
 */


import Block from './block';
import {Slider} from '../../local-react-components/blocks/posts-slider';
import './style.scss';

import {withPostOptions,withSliderPosts} from './resolvers'

import Placeholder from './placeHolder';
import InspectorControls from './inspectorControls';
import {withWpColor} from '../../components/colors';

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

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<InspectorControls key='inspectors' {...props} />
					<Placeholder key='holder' sliderPosts={sliderPosts} />

				</Fragment>
			);
		}

		return (
			<Fragment > 
				<InspectorControls key='inspectors' {...props} />
					<BlockControls key='blockControls' />
					<Slider key='slider' {...props} {...attributes} exerptEl={exerptEl} Block={Block} />

			</Fragment> 
		);		
	}
);

const EditFunc = compose([
	withPostOptions,
	withSliderPosts,
	withWpColor('textColor'),
	withWpColor('accentColor'),
	withMouseNavigation,
])( PostSliderEdit );

export default EditFunc;
