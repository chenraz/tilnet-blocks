
/**
 *  Card Edit
 */

/**
 * Externals
 */

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
import UploadImage from '../../components/UploadImage';
import useAttributeAndClass, {useAttributeValueClass} from '../../components/useAttribute';

const CardEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
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

    const [,imageAbove,setImageAbove] = useAttributeAndClass ({
        attrName: 'imageAbove',
        attrClassName: 'image-above',
        attrDefault: false,
    },props); 
    
    const cardText = (
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
    );

    const cardImage = (
        <div className='card-image'>
            <UploadImage
                name='image'
                attributes={attributes}
                setAttributes={setAttributes}
            />
        </div>
    );
    
    return ([
        <InspectorControls key='inspector'>
            <PanelBody title={ __( 'Layout' ) }>

                <ToggleControl
                    label={ __( 'Text on image' ) }
                    checked={ textOnImage }
                    onChange={ setTextOnImage }
                />	 

                { ! textOnImage &&
                    <ToggleControl
                        label={ __( 'Image Above' ) }
                        checked={ imageAbove }
                        onChange={ setImageAbove }
                    />	                
                }

                <ToggleControl
                    label={ __( 'With title' ) }
                    checked={ withTitle }
                    onChange={ setWithTitle }
                />	 

            </PanelBody>	            
        </InspectorControls>,
        <div key='card' className={classNames('wp-block-til-card',className)}>
            {imageAbove &&
                cardImage
            }
            {cardText}
            {! imageAbove &&
                cardImage
            }

        </div>
    ]);    
});

export default CardEdit;