/**
 * Inspector Controls
 */

 

/**
 * External dependencies
 */

import {isUndefined,map,reduce} from 'lodash';

const {
	PanelBody,
	QueryControls,
	RadioControl,
	ToggleControl,
	SelectControl,
	FormTokenField,
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

const PostsControl = (
	({
		attributes, 
		setAttributes, 
		postsTypesList,
		blocksTypesList,
		taxonomiesList,
		metaObj,
		postTypeEntity,
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
			metaBefore,
			metaAfter,
			displayPostDate, 
			order, 
			orderBy, 
			postType, 
			blockType, 
			taxonomy,
			postsToShow,
		} = attributes;

		const getMetaObject = (fields) => {

			const fieldsObj = reduce (fields,(result,field)=>{
				
				const fieldType = (isUndefined(metaObj[field]) || isUndefined(metaObj[field].description))
					?	'string'
					:	metaObj[field].description;

				result[field]=fieldType;
				return result;
			

			},{});


			return fieldsObj;
			
		}
		
		const metaKeys = Object.keys(metaObj || {});

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
						<FormTokenField
							title={__("Meta fields before")}
							value={Object.keys(metaBefore || {})}
							suggestions={metaKeys}
							placeholder={__("Meta fields before")}
							onChange={(fields)=>{
								setAttributes({
									metaBefore: getMetaObject(fields)
								})
							}}
						/>	
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
						<FormTokenField
							title={__("Meta fields after")}
							value={Object.keys(metaAfter || {})}
							suggestions={metaKeys}
							placeholder={__("Meta fields after")}
							// onChange={(fields)=>setAttributes({metaAfter: fields})}
							onChange={(fields)=>{
								setAttributes({
									metaAfter: getMetaObject(fields)
								})
							}}
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


export default PostsControl;
