/**
 * With Grop name controls
 */

 /**
  * Externals
  */
import {assign,defaultTo} from 'lodash';

const { __ } = wp.i18n; 
const { addFilter } = wp.hooks;
const {InspectorControls} = wp.blockEditor;
const {TextControl,PanelBody} = wp.components;

/**
 * Internals
 */
// import useAttributeAndClass from '../../components/useAttribute';

const enableOnBlocks = [
    'core/group',
];

/**
 * Add the full page attribute
 * @param {*} settings 
 */
export const addAttribute = (settings) => {

    if ( enableOnBlocks.includes( settings.name ) ) {
        settings.attributes = assign( settings.attributes, {
            groupName: {
                type: 'text',
            },
        } );  
    }
    return settings;  
}


/**
 * 
 * @param {*} props 
 */
const GroupNameControl = (props) => {
    const {attributes,setAttributes} = props;
    const {groupName} = attributes;
    return (
        <InspectorControls key="gropu-name">
            <PanelBody key="gropu_name" title={__("Group Name")}>
                    <TextControl 
                        label={__("Group Name")} 
                        value = {groupName}
                        onChange={(newName)=>setAttributes({groupName:newName})}
                    />
            </PanelBody>              
        </InspectorControls>    
    );    

}

export default GroupNameControl;

addFilter( 'blocks.registerBlockType', 'til/with-fullpage-controls/addAttribute', addAttribute );





