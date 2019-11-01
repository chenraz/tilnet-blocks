
/**
 * Customize wp-heading
 */

 /**
  * Externals
  */
const { addFilter } = wp.hooks;

/**
 * Internals
 */
import HeadingWithVertical from './headingWithVertical';
// import {withColor} from '../../components/colors';
import {withWpColors} from '../../components/colors';


const enableOnBlocks = [
    'core/heading',
];

const tilnetHeading = ( 
    WrappedComponent => (
        withWpColors('textColor',enableOnBlocks) (
            // withColor('textColor',enableOnBlocks) (
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