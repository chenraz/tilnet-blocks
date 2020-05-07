/**
 * BLOCK: blocks-slider
 *
 * A slider of blocks
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit from './edit';
// import save from './save';
import {save} from '../blocks-navigation'

/**
 * 
 */
registerBlockType( 'til/blocks-panel', {
	title: __( 'Blocks Panel' ),
	icon: Icon,
	category: 'til-blocks',
	description: __( 'Tabs panel from blocks' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — bloks panel' ),
		__( 'panel' ),
		__( 'tabs' ),
	],

	attributes: {
		tabs: {
			type: 'array',
		}
	},

	edit,
	
	save,
} );
