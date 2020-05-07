/**
 * Image
 */



const Image = ({
    src,
    alt="",
    placeholder = false
}) => {

    console.log ('debug the image',src);

    if (! src || 1 > src.length) {
        return placeholder 
            ?   placeholder
            :   '';
    }

    return <img src={src} alt={alt} />;

}

export default Image;