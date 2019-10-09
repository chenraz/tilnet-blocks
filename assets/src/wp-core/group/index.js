/**
 * Customize wp-group
 */

 /**
  * Extrnals
  */
const { addFilter } = wp.hooks;

/**
 * Internals
 */
import FullPagePanel from './withFullPage';
import useVertical from './withVericalFlags';
import {withColor} from '../../components/colors';
import {Group} from '../../local-react-components/blocks/group';

const enableOnBlocks = [
    'core/group',
];

const customGroup = 
    ( BlockEdit ) => {

        return withColor('backgroundColor',enableOnBlocks) (
            props => {
                if ( ! enableOnBlocks.includes( props.name ) ) {
                    return (
                        <BlockEdit key="edit" { ...props } />
                    );
                } 

                useVertical(props);
                
                return (
                    [
                        <FullPagePanel key='full-page-panel' {...props} />,
                        <Group key='til-group' {...props}>
                            <BlockEdit {...props} />
                        </Group>
                        
                    ]
                );

            }
        )
    };

addFilter( 'editor.BlockEdit', 'til/with-fullpage-controls/edit', customGroup );
