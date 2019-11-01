/**
 * BLOCK: blocks-navigation
 *
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit from './edit';
import save from './save';

/**
 * 
 */
registerBlockType( 'til/navigation-block', {
	title: __( 'Navigation Block' ), 
	icon: Icon,
	category: 'til-blocks', 
	description: __( 'Blocks navigation block' ),
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

	parent: [ 'til/blocks-navigation' ],

	edit,

	save,
} );
