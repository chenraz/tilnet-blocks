/**
 * Externals
 */
import {assign} from 'lodash';
const { useSelect } = wp.data;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { addFilter } = wp.hooks;

const enableOnBlocks = [
    'core/group',
];

import {getBlockByClassName} from '../../utils/selectors';
import useAttributeAndClass from '../../components/useAttribute/useAttribute';

export const addAttribute = (settings) => {

    if ( enableOnBlocks.includes( settings.name ) ) {

        settings.attributes = assign( settings.attributes, {
            hasVerticalHeader: {
                type: 'boolean',
                default: false,
            },
        } );  
    }
    return settings;  
}

const useVertical = (props) => {


    const [className,hasVerticalHeader,sethasVerticalHeader] = useAttributeAndClass (
        {
            attrName: 'hasVerticalHeader',
            attrClassName: 'has-vetical-header',
            attrDefault: false                
        },
        props
    );  
      
    const newHasVerticalHeader = useSelect ((select)=>{

        const innerBlocks = select('core/block-editor').getBlocks(props.clientId);

        const verticalBlocks = getBlockByClassName(innerBlocks,'core/heading','is-style-vetical');
        
        return (verticalBlocks && verticalBlocks.length);

 
    })

    if (
        newHasVerticalHeader != hasVerticalHeader
    ) {
        sethasVerticalHeader(newHasVerticalHeader);
    }

    return {className:className}     
    
}


addFilter( 'blocks.registerBlockType', 'til/with-vetical-flags/addAttribute', addAttribute );

export default useVertical;