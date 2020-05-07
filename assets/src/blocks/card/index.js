/**
 * Card Block
 */

 /**
  * Externals
  */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import PictureInPicture from './PictureInPicture';

/**
 * Internals
 */

// import Icon from './reviewIcon';

import edit from './edit';
// import attributes from '../../local-react-components/blocks/media-card/attributes';
import save from './save';

import './editor-style.scss';

registerBlockType( 'til/card', {
	title: __( 'Card' ), 
	icon: <PictureInPicture />,
	category: 'til-blocks', 
	description: __( 'Title, text and image' ),
	supports: {
		align: ['left', 'center', 'right'],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — card' ),
		__( 'card' ),
		__( 'media' ),
		__( 'media card' ),
	],

	// attributes,

	styles: [
		{
			name: 'default',
			label: __("Default"),
			isDefault: true,
		},
		{
			name: 'compact',
			label: __("Compact"),
		},		
	],

	edit,

	save,

} );