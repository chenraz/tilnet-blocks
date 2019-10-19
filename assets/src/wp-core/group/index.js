/**
 * Customize wp-group
 */

 /**
  * Extrnals
  */
const { addFilter } = wp.hooks;
// const { withColors } = wp.blockEditor;
const {compose} = wp.compose;
/**
 * Internals
 */
import FullPagePanel from './withFullPage';
import useVertical from './withVericalFlags';
// import {withColor} from '../../components/colors';
import {withWpColors} from '../../components/colors';

import {Group} from '../../local-react-components/blocks/group';
import ErrorBoundary from '../../local-react-components/components/Error';

const enableOnBlocks = [
    'core/group',
];

const WpGroup = ( 
    // withColor('backgroundColor',enableOnBlocks) (
    // withColors('backgroundColor') (
        withWpColors('backgroundColor') (
            (props) => {
            useVertical(props);
            console.log ('WpGroup : ', props);
            return (
                [
                    <ErrorBoundary key={'panel-error'}>
                        <FullPagePanel key='full-page-panel' {...props} />
                    </ErrorBoundary>,

                    <ErrorBoundary key={'group-error'}>
                        <Group key='til-group' {...props}>
                            {/* <BlockEdit {...props} /> */}
                            {props.children}
                        </Group>
                    </ErrorBoundary>

                    
                ]
            );
        }
    )
);

// const GroupWithColor = compose (

// );

const customGroup = 
    ( BlockEdit ) => {

        // return withColor('backgroundColor',enableOnBlocks) (
            // props => {
            return props => {

                // useVertical(props);

                if ( ! enableOnBlocks.includes( props.name ) ) {

                    console.log ('not customGroup: ',props);

                    return (
                        <BlockEdit key="edit" { ...props } />
                    );
                } 

                // useVertical(props);
                console.log ('yes customGroup: ',props);

                return (
                    // <ErrorBoundary>
                        <WpGroup {...props}>
                            <BlockEdit {...props} />    
                        </WpGroup>
                    // </ErrorBoundary>
                );
                
                // return (
                //     [
                //         <FullPagePanel key='full-page-panel' {...props} />,
                //         <Group key='til-group' {...props}>
                //             <BlockEdit {...props} />
                //         </Group>
                        
                //     ]
                // );

            }
        // )
    };

addFilter( 'editor.BlockEdit', 'til/group/edit', customGroup );
