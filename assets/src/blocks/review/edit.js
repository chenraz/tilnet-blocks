
/**
 *  Review Edit
 */

/**
 * Externals
 */
import { Fragment } from 'react';

const { __ } = wp.i18n;
const {
    PlainText,
} = wp.blockEditor;

const {
    useDispatch
} = wp.data;

import ImageUpload from '../../components/imageUpload';
/**
 * Internals 
*/
import '../../local-react-components/blocks/review/style.scss'
import StarRating from '../../components/starRating'
import { isUndefined } from 'util';

const ReviewEdit = ((props)=>{

    const { 
        attributes, 
        setAttributes,
        className
    } = props;
    
    const {
        review,
        profileImage,
        profileName,
        projectName,
        rating,
    } = attributes;

    const {editPost} = useDispatch('core/editor');

    const setReview = (text) => {
        setAttributes({review: text}); 
        editPost({excerpt:text})
    }

    const setImg = (img) => {
        const url = isUndefined(img.sizes.thumbnail)
            ?   img.url
            :   img.sizes.thumbnail.url;
        setAttributes({profileImage: url});    

        editPost({featured_media:img.id});
        
        console.log ('setting the img: ',img);
    }

    const setProjectName = (text) => {
        setAttributes({projectName: text});
        editPost({title: text});
    }

    const setRating = (rating) => {
        setAttributes({rating:rating});
        editPost({meta:{rating:rating}});

    }

    return (
        <Fragment > 
            <div className={className}>
                <div className='review-content'>
                    <PlainText
                        className='review-content-input'
                        placeholder={__('Review Content')}
                        value={ review }
                        onChange={setReview }
                        // onChange={ (text) => setAttributes({review: text}) }
                    />                      
                </div>
                <div className='review-details'>
                    <div className='profile-image-wrap'>
                        <ImageUpload
                            image={profileImage}
                            placeholder="Profile image here"
                            onSetImage={setImg}
                            // onSetImage={ (img) => {
                            //     const url = isUndefined(img.sizes.thumbnail)
                            //         ?   img.url
                            //         :   img.sizes.thumbnail.url;
                            //     setAttributes({profileImage: url});
                            //  }}
                        />

                    </div>
                    <div className='profile-name-wrap'>
                        <PlainText
                            className='profile-name'
                            placeholder={__('Profile Name')}
                            value={ profileName }
                            onChange={ (text) => setAttributes({profileName: text}) }
                        />  
                    </div>

                    <div className='project-name-wrap'>
                        <PlainText
                            className='project-name'
                            placeholder={__('Project Name')}
                            value={ projectName }
                            onChange={ setProjectName }
                            // onChange={ (text) => setAttributes({projectName: text}) }
                        />  
                    </div>

                        <StarRating 
                            rating={ rating }
                            // setRating={ (newRating) => setAttributes({rating:newRating}) }
                            setRating={setRating}
                            normalColor={'#114d73'}
                            hoverColor={'#2571a1'}
                        />
                </div>

            </div>
        </Fragment> 
    );    
});

export default ReviewEdit;