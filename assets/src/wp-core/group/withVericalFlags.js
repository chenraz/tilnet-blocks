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
import useAttributeAndClass from '../../components/useAttribute';

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

    console.log ('useVertical', props);

    const [className,hasVerticalHeader,setHasVerticalHeader] = useAttributeAndClass (
        {
            attrName: 'hasVerticalHeader',
            attrClassName: 'has-vertical-header',
            attrDefault: null                
        },
        props
    ); 
     
    const newHasVerticalHeader = useSelect ((select)=>{


        const innerBlocks = select('core/block-editor').getBlocks(props.clientId);

        const verticalBlocks = getBlockByClassName(innerBlocks,'core/heading','is-style-vetical');
        
        console.log (`use vertical useSelect`, props);

        return (verticalBlocks && verticalBlocks.length > 0);


    })

    console.log (`use vertical check: newHasVerticalHeader:${newHasVerticalHeader} hasVerticalHeader: ${hasVerticalHeader}`);

    if (
        
        newHasVerticalHeader != hasVerticalHeader
    ) {
        setHasVerticalHeader(newHasVerticalHeader);
    }

    // return {className:className}     
    
}


addFilter( 'blocks.registerBlockType', 'til/with-vetical-flags/addAttribute', addAttribute );

export default useVertical;