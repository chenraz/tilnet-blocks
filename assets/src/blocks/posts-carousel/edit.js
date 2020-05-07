/**
 * Post Carousel Edit
 * Base on latest-posts block
 */

/**
 * External dependencies
 */

import { Fragment,useMemo } from 'react';


const { __ } = wp.i18n;
const {
	InspectorControls,
	BlockControls,
} = wp.blockEditor;
const { compose } = wp.compose;
const {
	PanelBody,
	RangeControl,
	BaseControl,
	ToggleControl,
	TextControl,
} = wp.components;


/**
 * Internal Dependencies
 */


import Block from './block';
import Post from '../../local-react-components/components/post'

import Carousel from '../../local-react-components/components/carousel';
import './style.scss';

import {withPostOptions,withPosts} from '../../utils/resolvers'

import PostsControls from '../../components/PostsControls'
import {withWpColors} from '../../components/colors';


import withMouseNavigation from '../../components/mouseNavigation';
// import { ArrowLeft } from '@material-ui/icons';

const CarouselControls = ({
	attributes, 
	setAttributes, 	
}) => {

	const {
		slidesPerPage,
		slidesPerScroll,
		animationSpeed,
		autoPlay,
		offset,
		infinite,
		centered,
		showArrows,
	} = attributes;

	const setNumberAttr = (attrName,attrVal) => {
		setAttributes({[attrName]: parseInt(attrVal)});	
	}

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Carousel Settings' ) }>
				<TextControl 
					label={__("Visible Slides")}
					value={slidesPerPage}
					onChange={(newVal)=>{
						// setAttributes({slidesPerPage:parseInt(newVal)})
						setNumberAttr ('slidesPerPage',newVal);
					}}
					type='number'
				/>

				<TextControl 
					label={__("Scroll slides")}
					help={__("Number of slides to scroll")}
					value={slidesPerScroll}
					// onChange={(newVal)=>setAttributes({slidesPerScroll:newVal})}
					onChange={(newVal)=>setNumberAttr('slidesPerScroll', newVal)}
					type='number'
				/>

				<TextControl 
					label={__("Animation Speed")}
					value={animationSpeed}
					onChange={(newVal)=>setNumberAttr('animationSpeed',newVal)}
					// onChange={(newVal)=>setAttributes({animationSpeed:newVal})}
					type='number'
				/>

				<TextControl 
					label={__("Autoplay speed")}
					value={autoPlay}
					onChange={(newVal)=>setNumberAttr('autoPlay',newVal)}
					// onChange={(newVal)=>setAttributes({autoPlay:newVal})}
					type='number'
				/>

				<TextControl 
					label={__("Offset")}
					value={offset}
					onChange={(newVal)=>setNumberAttr('offset',newVal)}
					// onChange={(newVal)=>setAttributes({offset:newVal})}
					type='number'
				/>

				<ToggleControl 
					label={__("Infinite")}
					checked={infinite}
					onChange={(newVal)=>setAttributes({infinite:newVal})}
				/>	

				<ToggleControl 
					label={__("Centered")}
					checked={centered}
					onChange={(newVal)=>setAttributes({centered:newVal})}
				/>	

				<ToggleControl 
					label={__("Show arrows")}
					checked={showArrows}
					onChange={(newVal)=>setAttributes({showArrows:newVal})}
				/>															

			</PanelBody>

		</InspectorControls>
	);
}

/**
 * 
 * @param {*} props 
 */
const PostsCarouselEdit = (
	(props) => {

		const { 
			attributes, 
			posts,
		} = props;

		const { 
			showTitle,
			showExcerpt,
			showThumbnail,
			slidesPerPage,
			slidesPerScroll,
			animationSpeed,
			autoPlay,
			offset,
			infinite,
			centered,	
			showArrows,		
		} = attributes;



		const slides = useMemo (
			()=> {
				console.log ("using memo: ",posts);
				return posts.map((post,i)=><Post key={`post-${i}`} post={post} {...{showThumbnail,showExcerpt,showTitle}} />)
			},
			[posts,attributes]
		);
		
		return (
			<Fragment > 
				<div>
					<PostsControls key='inspectors' {...props} />
					<CarouselControls key='carousel-control' {...props} />
				</div>
				<div>
					{/* <BlockControls key='blockControls' /> */}
					<Carousel 
						// slides = {posts.map((post,i)=><Post key={`post-${i}`} post={post} {...{showThumbnail,showExcerpt,showTitle}} />)}
						{...{
							slides,
							slidesPerPage,
							slidesPerScroll,
							animationSpeed,
							autoPlay,
							offset,
							infinite,
							centered,		
						}}
						arrowLeft = {showArrows ? undefined : null}
						arrowRight = {showArrows ? undefined : null}
					/>
				</div>
			</Fragment> 
		);		
	}
);

const EditFunc = compose([
	withPostOptions,
	withPosts,
	withWpColors('textColor','accentColor'),
	// withMouseNavigation,
])( PostsCarouselEdit );

export default EditFunc;
