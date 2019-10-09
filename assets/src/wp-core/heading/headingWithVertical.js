/**
 * With Vertical controls
 */

/**
 * Externals
 */
const { __ } = wp.i18n; // Import __() from wp.i18n

/**
 * Internals
 */
import {useVertical} from '../../local-react-components/blocks/heading';


const HeaedingWithVertical = (

    props => {

        const {tagRef} = useVertical(props);

        return (
            <div ref={tagRef}>
                {props.children}
            </div>

        );                

    }
); 

export default HeaedingWithVertical;



