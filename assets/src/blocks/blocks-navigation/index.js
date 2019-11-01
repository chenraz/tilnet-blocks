/**
 * BLOCK: blocks-navigation
 *
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { 
	registerBlockType,
	setDefaultBlockName
 } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit from './edit';
import save from './save';

/**
 * 
 */
registerBlockType( 'til/blocks-navigation', {
	title: __( 'Blocks Navigation' ), 
	icon: Icon,
	category: 'til-blocks', 
	description: __( 'Blocks navigation' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — bloks navigation' ),
		__( 'navigation' ),
	],
	attributes: {

	},

	edit,

	save,
} );

setDefaultBlockName();
