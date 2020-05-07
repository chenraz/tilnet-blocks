/**
 * BLOCK: blocks-navigation
 *
 */

const { __ } = wp.i18n; 
const { 
	registerBlockType,
	// setDefaultBlockName
 } = wp.blocks; 

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit,{BlocksEdit, BlocksNavigation,useCurrent} from './edit';
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

	parent: [],

	edit,

	save,
} );

// setDefaultBlockName();

export {
	BlocksEdit,
	BlocksNavigation,
	edit,
	save,
	useCurrent
}
