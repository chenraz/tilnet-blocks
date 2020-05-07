 /**
  * Externals
  */
const {registerBlockType} = wp.blocks;
const { __ } = wp.i18n; 

/**
 * Internals
 */

 import edit from './edit';

registerBlockType ('til/social-link-text',{
	title: __( 'Social Link Text' ), 
	icon: 'editor-textcolor',
	category: 'til-blocks', 
	parent: [ 'core/social-links' ],
	description: __( 'Social link text button' ),
	supports: {
		reusable: false,
        html: false,
	},
	keywords: [
		__( 'tilnet-blocks — social text button' ),
		__( 'social' ),
		__( 'text' ),
		__( 'button' ),
    ],
    
    attributes: {
        url: {
            type: 'string'
        },
        site: {
            type: 'string',
            default: 'text'
        },
        label: {
            type: 'string',
        }
    },


	edit,

});






