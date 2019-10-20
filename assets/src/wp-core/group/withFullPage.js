/**
 * With fullpage controls
 */

 /**
  * Externals
  */
import {assign,defaultTo} from 'lodash';

const { __ } = wp.i18n; 
const { addFilter } = wp.hooks;
const {InspectorControls} = wp.blockEditor;
const {ToggleControl,PanelBody} = wp.components;

/**
 * Internals
 */
import useAttributeAndClass from '../../components/useAttribute';
import { isUndefined } from 'util';

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
            isFullPage: {
                type: 'boolean',
            },
        } );  
    }
    return settings;  
}

/**
 * 
 * @param {*} props 
 */
export const useFullPage = (props) => {
    // const defaultIsFullPage = isUndefined(props.attributes.isFullPage)
    //     ?   false
    //     :   props.attributes.isFullPage;

        const defaultIsFullPage = defaultTo (props.attributes.isFullPage, false);

        const [className,isFullPage,updateIsFullPage] = useAttributeAndClass(
            {
            attrName: 'isFullPage',
            attrClassName: 'full-page',
            attrDefault: defaultIsFullPage
        },
        props
    );  
    
    return {className,isFullPage,updateIsFullPage}
}

/**
 * 
 * @param {*} props 
 */
const FullPagePanel = (props) => {
    const {className,isFullPage,updateIsFullPage} = useFullPage(props);
    return (
        <InspectorControls key="appearance">
            <PanelBody key="til_appearance" title={__("Appearance")}>
                    <ToggleControl 
                        label={__("Full Page")} 
                        checked = {isFullPage}
                        onChange={updateIsFullPage}
                    />
            </PanelBody>              
        </InspectorControls>    
    );    

}

export default FullPagePanel;

addFilter( 'blocks.registerBlockType', 'til/with-fullpage-controls/addAttribute', addAttribute );





