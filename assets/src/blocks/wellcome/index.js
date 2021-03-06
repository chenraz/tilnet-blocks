/**
 * BLOCK: Wellcome
 *
 */

 /**
  * Externals
  */
import { Fragment } from 'react';
import classNames from 'classnames/dedupe';
import {defaultTo} from 'lodash';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { compose } = wp.compose;
const {
	PanelColorSettings,
	RichText,
	InspectorControls,
} = wp.blockEditor;
const {PanelBody} = wp.components;

/**
 * Internals
 */
import '../../local-react-components/blocks/wellcome/style.scss';
import './editor.scss';
import Wellcome from '../../local-react-components/blocks/wellcome'
import ImageUpload from '../../components/imageUpload';
// import {withWpColor} from '../../components/colors';
import {withWpColors} from '../../components/colors';


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'til/wellcome', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'wellcome' ), // Block title.
	icon: 'admin-home', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'til-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Full page wellcome screen.' ),
	supports: {
		anchor: true,	
	},
	keywords: [
		__( 'tilnet-blocks — wellcome' ),
		__( 'wellcome' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		anchor: {
			type: 'string',
		},
		text: {
			type: 'string',
		},
		tagline: {
			type: 'string',
		},	
		bottomText: {
			type: 'string',
		},			
		image: {
			type: 'string',
		},	
		logo: {
			type: 'string',
		},	
		textColor: {
			"type": "string"
		}, 			
		backgroundColor: {
			"type": "string"
		}, 		
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: compose([
		// withWpColor('backgroundColor'),
		// withWpColor('textColor')
		withWpColors('backgroundColor','textColor')
	])(( props ) => {
		const { 
			attributes: { text,tagline,bottomText,image,logo,className }, 
			setAttributes, 
			backgroundColor, setBackgroundColor,
			textColor, setTextColor,
		} = props;

		const onChangeText = ( newText ) => {
			setAttributes( { text: newText } );
		};

		const onChangeTagline = ( newTagline ) => {
			setAttributes( { tagline: newTagline } );
		};

		const onChangeBottomText = ( newBottomText ) => {
			setAttributes( { bottomText: newBottomText } );
		};		

		const onSetImage = ( newImage ) => {
			setAttributes( { image: newImage.url } );
		};	

		const onSetLogo = ( newLogo ) => {
			setAttributes( { logo: newLogo.url } );
		};			

		return (
			<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Colors' ) }>
					<PanelColorSettings
						title={ __( 'Background color' ) }
						initialOpen={ true }
						colorSettings={ [ 
							{
								value: defaultTo(backgroundColor.color,''),
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},
							{
								value: defaultTo(textColor.color,''),
								onChange: setTextColor,
								label: __( 'Text Color' ),
							}							
							
						] }
					/>					
				</PanelBody>
			</InspectorControls>				
			<div className={classNames(className,'wellcome-block')}>
				<div className='content'>
					<div className='inner-content'>
						<RichText
							tagName="div"
							className="top-content"
							placeholder="add content"
							onChange={ onChangeText }
							value={ text }
						/>
						<RichText
							tagName="div"
							className="tagline"
							placeholder="add tagline"
							onChange={ onChangeTagline }
							value={ tagline }
						/>	
						<RichText
							tagName="div"
							className="bottomText"
							placeholder="add bottom text"
							onChange={ onChangeBottomText }
							value={ bottomText }
						/>												
					</div>
				</div>
				<div className='image-wrap'>
					<ImageUpload
						onSetImage={ onSetImage }
						image={image}
						placeholder="Insert Image"
					/>

				</div>
				<div className='logo-wrap'>
					<ImageUpload
						onSetImage={ onSetLogo }
						image={logo}
						placeholder="Insert logo"
					/>					

				</div>
			</div>
			</Fragment>
		);
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {


		const opts = {
			attrs: props.attributes
		};

		return (
			<Wellcome {...opts} />
		);

	},
} );
