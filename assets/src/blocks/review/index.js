/**
 * Review Block
 */

 /**
  * Externals
  */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internals
 */

import Icon from './reviewIcon';
import edit from './edit';
import attributes from '../../local-react-components/blocks/review/attributes';
import save from './save';

registerBlockType( 'til/review', {
	title: __( 'Review' ), 
	icon: Icon,
	category: 'til-blocks', 
	description: __( 'Customers Review' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — review' ),
		__( 'review' ),
		__( 'reviews' ),
	],

	attributes,

	edit,

	save,
	// save: ({attributes}) => {
	// 	console.log ('bloohdy hell',props);
	// }
} );