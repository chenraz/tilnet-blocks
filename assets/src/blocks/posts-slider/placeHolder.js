/**
 * No posts placeholder
 */

/**
 * Externals
 */
const {
    Placeholder: CorePlaceholder,
    Spinner
} = wp.components;
const { __ } = wp.i18n;

/**
 * 
 * @param {*} sliderPosts 
 */
const Placeholder = (sliderPosts) =>(
    <CorePlaceholder
        icon="admin-post"
        label={ __( 'Posts Slider' ) }
        >
        { ! Array.isArray( sliderPosts ) ?
            <Spinner /> :
            __( 'No posts found.' )
        }
    </CorePlaceholder>
);

export default Placeholder;