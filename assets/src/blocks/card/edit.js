
/**
 *  Card Edit
 */

/**
 * Externals
 */

import {useState, Fragment} from 'react'; 
import classNames from 'classnames/dedupe';
import {kebabCase,findIndex} from 'lodash';

const { __ } = wp.i18n;
const {
	InnerBlocks,
    InspectorControls,
    } = wp.blockEditor;
const {
	PanelBody,
} = wp.components;



/**
 * Internals 
*/
// import '../../local-react-components/blocks/review/style.scss'
// import OverlayIcon from './OverlayIcon';
// import AboveIcon from './AboveIcon';
// import BelowIcon from './BelowIcon';

const template = [
    ['core/group',{},[
        ['core/heading',{level:3}],
        ['core/paragraph'],
        ['core/image']
    ]]
];


// const TEMPLATE_OPTIONS = [
//     {
//         title: __('Title above image'),
//         icon:  <AboveIcon />,
//         template: [['core/group',{},[
//             ['core/heading',{level:3}],
//             ['core/paragraph'],
//             ['core/image']
//         ]]],
//     },
  
//     {
//         title: __('Title below image'),
//         icon:  <BelowIcon />,
//         template: [['core/group',{},[
//             ['core/image'],
//             ['core/heading',{level:3}],
//             ['core/paragraph'],
//         ]]],
//     },  
//     {
//         title: __('Text above image'),
//         icon:  <OverlayIcon />,
//         template: [['core/group',{},[
//             ['core/paragraph'],
//             ['core/image']
//         ]]],
//     },   
//     {
//         title: __('Image above text'),
//         icon:  <OverlayIcon />,
//         template: [['core/group',{},[
//             ['core/image'],
//             ['core/paragraph'],
//         ]]],
//     },             
// ];


const CardEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
        innerBlocks,
    } = props;

    // const {template:curTemplate} = attributes;

	// const [ template, setTemplate ] = useState( curTemplate ? getTemplateName(curTemplate) : false);
	// const [ template, setTemplate ] = useState( getTemplate(curTemplate));
	// const showTemplateSelector = ! template;
    
    return (
        <Fragment>
            <InspectorControls key='inspector'>
                <PanelBody title={ __( 'Layout' ) }>

                </PanelBody>	            
            </InspectorControls>
            <div key='card' className={classNames(
                    'wp-block-til-card',
            )}>

                <InnerBlocks
                    template={template}
                />
            </div>
        </Fragment>
    );    
});

export default CardEdit;