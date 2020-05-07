/**
 * Modal Block
 */

 /**
  * Externals
  */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internals
 */

import OpenInNew from './OpenInNew'
import edit from './edit';
// import attributes from '../../local-react-components/blocks/media-card/attributes';
import save from './save';

// import './editor-style.scss';

registerBlockType( 'til/modal', {
	title: __( 'Modal' ), 
	icon: <OpenInNew />,
	category: 'til-blocks', 
	description: __( 'Modal with open button' ),
	supports: {
		align: ['left', 'center', 'right'],
		anchor: true,
	},
	keywords: [
		__( 'tilnet-blocks — modal' ),
		__( 'modal' ),
	],

	// attributes,

	edit,

	save,

} );