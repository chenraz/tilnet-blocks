
/**
 *  Media Card Edit
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
    __experimentalDimensionControl:DimensionControl,
} = wp.components;



/**
 * Internals 
*/
import '../../local-react-components/blocks/review/style.scss'
import OverlayIcon from './OverlayIcon';
import AboveIcon from './AboveIcon';
import BelowIcon from './BelowIcon';

const TEMPLATE_OPTIONS = [
    {
        title: __('Title above image'),
        icon:  <AboveIcon />,
        template: [['core/group',{},[
            ['core/heading',{level:3}],
            ['core/paragraph'],
            ['core/image']
        ]]],
    },
  
    {
        title: __('Title below image'),
        icon:  <BelowIcon />,
        template: [['core/group',{},[
            ['core/image'],
            ['core/heading',{level:3}],
            ['core/paragraph'],
        ]]],
    },  
    {
        title: __('Text above image'),
        icon:  <OverlayIcon />,
        template: [['core/group',{},[
            ['core/paragraph'],
            ['core/image']
        ]]],
    },   
    {
        title: __('Image above text'),
        icon:  <OverlayIcon />,
        template: [['core/group',{},[
            ['core/image'],
            ['core/paragraph'],
        ]]],
    },             
];

const getTemplateName = (template) => {
    
    const groupTemplate = (1 > template.length)
        ?   []
        :   template[0];

    const count = groupTemplate.length;

    const firstBlock = (1 > count)
        ?   false
        :   groupTemplate[0];

    if (! firstBlock) {
        return kebabCase(TEMPLATE_OPTIONS[0].title);
    }        
    let index = 0;
    switch (firstBlock) {
        case 'core/heading' :
            index = 0;
            break;
        case 'core/image' :
            index = (2 === count)
                ?   3
                :   1;
            break;
        case 'core/paragraph' :
            index = 2;
    }

    return kebabCase(TEMPLATE_OPTIONS[index].title)

}

const getTemplate = (kebabName) => {

    if (! kebabName) {
        return null;
    }

    const index = findIndex(TEMPLATE_OPTIONS,(template)=>{
        return kebabCase(template.title) === kebabName;
    });

    if (0 > index) {
        return null;
    }

    return TEMPLATE_OPTIONS[index].template;
}

const CardEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
        innerBlocks,
    } = props;

    const {template:curTemplate} = attributes;

	// const [ template, setTemplate ] = useState( curTemplate ? getTemplateName(curTemplate) : false);
	const [ template, setTemplate ] = useState( getTemplate(curTemplate));
	const showTemplateSelector = ! template;
    
    return (
        <Fragment>
            { ! showTemplateSelector &&
                <InspectorControls key='inspector'>
                    <PanelBody title={ __( 'Layout' ) }>

                    </PanelBody>	            
                </InspectorControls>
            }
            <div key='card' className={classNames(
                    'wp-block-til-mediacard',
                    curTemplate
            )}>

                <InnerBlocks
                    __experimentalTemplateOptions={ TEMPLATE_OPTIONS }
                    __experimentalOnSelectTemplateOption={ ( nextTemplate,d ) => {

                        if ( nextTemplate === undefined ) {
                            nextTemplate = TEMPLATE_OPTIONS[0];
                        }

                        setTemplate( nextTemplate );
                        setAttributes({template:getTemplateName(nextTemplate)});
                    } }
                    template={ showTemplateSelector ? null : getTemplate(template) }
                    templateLock="all"
                />
            </div>
        </Fragment>
    );    
});

export default CardEdit;