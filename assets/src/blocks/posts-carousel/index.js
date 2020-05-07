/**
 * BLOCK: posts-carousel
 *
 * A carousel of posts
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 

/**
 * Internal dependencies
 */
import Icon from './svgIcon';
import edit from './edit';
import {attributes} from '../../local-react-components/components/carousel'

registerBlockType( 'til/posts-carousel', {
	title: __( 'Posts Carousel' ), 
	icon: Icon,
	category: 'til-blocks', 
	description: __( 'Carousel from blocks on posts' ),
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,	
	},
	keywords: [
		__( 'tilnet-blocks — posts carousel' ),
		__( 'carousel' ),
		__( 'slider' ),
	],

	attributes,

	edit,

	save: ()=>{},
} );



