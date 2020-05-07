
/**
 * Customize wp-heading
 */

 /**
  * Externals
  */
const { addFilter } = wp.hooks;
const {registerBlockStyle} = wp.blocks;
const { __ } = wp.i18n; 

/**
 * Internals
 */
import HeadingWithVertical from './headingWithVertical';
import {withWpColors} from '../../components/colors';


const enableOnBlocks = [
    'core/heading',
];

const tilnetHeading = ( 
    WrappedComponent => (
        withWpColors('textColor',enableOnBlocks) (
            props => {

                if ( enableOnBlocks.includes( props.name ) ) {
                    return (
                        <HeadingWithVertical {...props}>
                            <WrappedComponent {...props} />
                        </HeadingWithVertical>
                    );
                }

                return <WrappedComponent {...props} />

            }
        )
    )
);

addFilter( 'editor.BlockEdit', 'til/tilnetHeading/BlockEdit', tilnetHeading );

registerBlockStyle( 'core/heading', {
    name: 'horizontal',
    label: __('Horizontal'),
    isDefault: true,
} );
registerBlockStyle( 'core/heading', {
    name: 'vertical',
    label: __('Vertical'),
} );
