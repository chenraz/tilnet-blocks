/**
 * BLOCK: blocks-slider
 *
 * A slider of blocks
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import {edit,save} from '../blocks-navigation';

/**
 * 
 */
registerBlockType( 'til/blocks-slider', {
	title: __( 'Blocks Slider' ),
	icon: Icon,
	category: 'til-blocks',
	description: __( 'Slider from reusable blocks' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — bloks slider' ),
		__( 'slider' ),
	],
	attributes: {
		"backgroundColor": {
			"type": "string"
		},
		"customBackgroundColor": {
			"type": "string"
		}
	},

	edit,
	
	save,
} );
