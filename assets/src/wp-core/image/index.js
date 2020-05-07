const {registerBlockStyle} = wp.blocks;
const { __ } = wp.i18n; 

import './editor.scss'

registerBlockStyle( 'core/image', {
    name: 'overlay',
    label: __('Overlay'),
} );