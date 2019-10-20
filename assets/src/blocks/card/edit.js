
/**
 *  Card Edit
 */

/**
 * Externals
 */
// import { Fragment } from 'react';
// import { isEmpty } from 'lodash';
import classNames from 'classnames/dedupe'

const { __ } = wp.i18n;
const {
    RichText,
    InspectorControls,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
} = wp.components;



/**
 * Internals 
*/
import '../../local-react-components/blocks/review/style.scss'
// import ImageUpload from '../../components/imageUpload';
import UploadImage from '../../components/UploadImage';
import useAttributeAndClass, {useAttributeValueClass} from '../../components/useAttribute';

const CardEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
        // className
    } = props;
    
    const {
        image,
        title,
        text,
    } = attributes;

    const {className} = attributes;


    useAttributeValueClass({
        attrName: 'align',
        attrDefault: null,
    },props);    

    const [,textOnImage,setTextOnImage] = useAttributeAndClass ({
        attrName: 'onImage',
        attrClassName: 'text-on-image',
        attrDefault: false,
    },props);

    const [,withTitle,setWithTitle] = useAttributeAndClass ({
        attrName: 'withTitle',
        attrClassName: 'with-title',
        attrDefault: false,
    },props);    

    return ([
        <InspectorControls key='inspector'>
            <PanelBody title={ __( 'Layout' ) }>

                <ToggleControl
                    label={ __( 'Text on image' ) }
                    checked={ textOnImage }
                    onChange={ setTextOnImage }
                />	 

                <ToggleControl
                    label={ __( 'With title' ) }
                    checked={ withTitle }
                    onChange={ setWithTitle }
                />	 

            </PanelBody>	            
        </InspectorControls>,
        <div key='card' className={classNames('wp-block-til-card',className)}>
            <div className='card-text'>
                {withTitle &&
                    <RichText
                        tagName="h3"
                        className="card-title"
                        placeholder="Add title"
                        onChange={ (newTitle) => setAttributes({title:newTitle}) }
                        value={ title }
                    />                   
                }
                <RichText
                    tagName="p"
                    className="card-text"
                    placeholder="Add text"
                    onChange={ (newText) => setAttributes({text:newText}) }
                    value={ text }
                />                  
            </div>
            <div className='card-image'>
                <UploadImage
                    name='image'
                    // image={image}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            </div>

        </div>
    ]);    
});

export default CardEdit;