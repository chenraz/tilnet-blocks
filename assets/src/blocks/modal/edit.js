
/**
 *  Media Card Edit
 */

/**
 * Externals
 */
import {Fragment} from 'react';
import classNames from 'classnames/dedupe';
import {kebabCase,findIndex} from 'lodash';

const { __ } = wp.i18n;
const {
	InnerBlocks,
    InspectorControls,
    } = wp.blockEditor;
const {
	PanelBody,
    __experimentalDimensionControl:DimensionControl,
} = wp.components;



/**
 * Internals 
*/
// import '../../local-react-components/blocks/review/style.scss'
// import OverlayIcon from './OverlayIcon';
// import AboveIcon from './AboveIcon';
// import BelowIcon from './BelowIcon';

const template = [
    ['core/button'],
    ['core/heading',{level:3,placeholder: "Modal Title"}],
    ['core/group',{}],   
];



const ModalEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
        innerBlocks,
    } = props;

    // const {template:curTemplate} = attributes;

	// const [ template, setTemplate ] = useState( getTemplate(curTemplate));
	// const showTemplateSelector = ! template;
    
    return (
        <Fragment>
            <InspectorControls key='inspector'>
                <PanelBody title={ __( 'Layout' ) }>

                </PanelBody>	            
            </InspectorControls>
            <div key='modal' className={classNames(
                    'wp-block-til-modal',
                    // curTemplate
            )}>

                <InnerBlocks
                    template={ template }
                    // templateLock="all"
                />
            </div>
        </Fragment>
    );    
});

export default ModalEdit;