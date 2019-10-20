import {defaultTo,isUndefined} from 'lodash'

const {MediaUpload} = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n; 

const Img = ({image,placeholder}) => {

    if (! image || ! image.src) {
        return <p>{ placeholder }</p>
    }
    return (
        <img src={ image.src } alt={image.alt} />
    );
}

const UploadImage = (props) => {

    const defaults = {
        name: 'image',
        placeholder: __('Insert Image'),
        size: false
    }

    const {
        name,
        size,
        // image,
        placeholder,
        attributes,
        setAttributes,
    } = {...defaults,...props};

    const image = defaultTo(attributes[name],{src: false,alt:''})

    // const src = isUndefined(image)
    //     ?   false
    //     :   defaultTo(image.src,false);
    // const alt = isUndefined(image)
    //     ?   ''
    //     :   defaultTo(image.alt,'');

    const onSetImage = (newImage) => {
        console.log ('onsetImage new:',newImage);
        const newSrc = (size && ! isUndefined(newImage.sizes[size]))
            ?   newImage.sizes[size].url
            :   newImage.url;
        const newAlt = defaultTo(newImage.alt,'');

        setAttributes({
            [name]: {src:newSrc,alt:newAlt}
        })
            
    }

    return (
        <MediaUpload
            onSelect={  onSetImage }
            value={ image.src }
            render={ ( { open } ) => (
                <Button onClick={ open }>
                    <Img image={ image } placeholder={placeholder} />
                </Button>
            ) }					
        />
    );
}

export default UploadImage;