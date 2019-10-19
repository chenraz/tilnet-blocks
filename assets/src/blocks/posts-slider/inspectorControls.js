/**
 * Inspector Controls
 */

/**
 * External dependencies
 */

import {isUndefined} from 'lodash';

const {
	PanelBody,
	QueryControls,
	RadioControl,
	ToggleControl,
	SelectControl,
} = wp.components;
const { __ } = wp.i18n;
const {
	InspectorControls:WpInspectorControls,
	PanelColorSettings,
} = wp.blockEditor;

/**
 * Internal Dependencies
 */

/**
 * Module Constants
 */

const InspectorControls = (
	({
		attributes, 
		setAttributes, 
		postsTypesList,
		blocksTypesList,
		taxonomiesList,
		textColor,
		setTextColor,
		accentColor,
		setAccentColor,
	}) => {

		const { 
			contentLayout,
			showTitle,
			showExcerpt,
			showThumbnail,
			displayPostDate, 
			order, 
			orderBy, 
			postType, 
			blockType, 
			taxonomy,
			postsToShow,
		} = attributes;



		return (
			<WpInspectorControls>
				<PanelBody title={ __( 'Post Settings' ) }>
					<SelectControl
						label={ __( 'Post Type' ) }
						value={ postType }
						onChange={ ( value ) => setAttributes( { postType: value,taxonomy: '' } ) }
						options = {postsTypesList}
					/>
					<SelectControl
						label={ __( 'Taxonomy' ) }
						value={ taxonomy }
						onChange={ ( value ) => setAttributes( { taxonomy: value } ) }
						options = {taxonomiesList}
					/>	
				</PanelBody>

				<PanelBody title={ __( 'Source Control' ) }>
					<RadioControl
						label="Source:"
						selected={ contentLayout }
						options={ [
							{ label: 'Post Meta', value: 'post' },
							{ label: 'Blocks', value: 'blocks' },
						] }
						onChange={ ( value ) => setAttributes( { contentLayout: value } ) }
					/>									
				</PanelBody>	

				{ 'post' === contentLayout &&
					<PanelBody title={ __( 'Content Settings' ) }>
						<ToggleControl
							label={ __( 'Display title' ) }
							checked={ showTitle }
							onChange={ ( value ) => setAttributes( { showTitle: value } ) }
						/>						
						<ToggleControl
							label={ __( 'Display excerpt' ) }
							checked={ showExcerpt }
							onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
						/>

						<ToggleControl
							label={ __( 'Display thumbnail' ) }
							checked={ showThumbnail }
							onChange={ ( value ) => setAttributes( { showThumbnail: value } ) }
						/>	
						<ToggleControl
							label={ __( 'Display post date' ) }
							checked={ displayPostDate }
							onChange={ ( value ) => setAttributes( { displayPostDate: value } ) }
						/>						
					</PanelBody>
				}

				{ 'blocks' === contentLayout &&
					<PanelBody title={ __( 'Blocks Settings' ) }>
						<SelectControl
							label={ __( 'Block Type' ) }
							value={ blockType }
							onChange={ ( value ) => setAttributes( { blockType: value } ) }
							options = {blocksTypesList}
						/>
					</PanelBody>
				}

				{showExcerpt && 
					<PanelColorSettings
						title={ __( 'Colors' ) }
						initialOpen={ true }
						colorSettings={ [ 
							{
								value: isUndefined(textColor) ? '' : textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
							{
								value: isUndefined(accentColor) ? '' : accentColor.color,
								onChange: setAccentColor,
								label: __( 'Accent Color' ),
							}							
						] }
					/>
				}				

				<PanelBody title={ __( 'Sorting and Filtering' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						selectedPostTypeId={ postType }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
				</PanelBody>
			</WpInspectorControls>

		)
	}
);


export default InspectorControls;
