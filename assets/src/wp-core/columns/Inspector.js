import {assign} from 'lodash';

const {
	InspectorControls,
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
} = wp.components;

const { addFilter } = wp.hooks;
const { __ } = wp.i18n; 

import {useAttribute} from '../../components/useAttribute';

const enableOnBlocks = [
    'core/columns',
];

const addAttribute = (settings) => {

    if ( enableOnBlocks.includes( settings.name ) ) {
        settings.attributes = assign( settings.attributes, {
            width: {
                type: 'number',
            },
        } );  
    }
    return settings;  
}

const Inspector = (props) => {
    const {attrVal,updateAttribute} = useAttribute (
        {
            attrName: 'width',
            attrDefault: 100                
        },
        props
    ); 
    
    return (
        <InspectorControls>
            <PanelBody>
                <RangeControl
                    label={ __( 'Width' ) }
                    value={ attrVal }
                    onChange={ ( value ) => updateAttribute( value ) }
                    min={ 0 }
                    max={ 100 }
                />
            </PanelBody>
        </InspectorControls>        
    );
}

export default Inspector;

addFilter( 'blocks.registerBlockType', 'til/columns/addAttribute', addAttribute );
