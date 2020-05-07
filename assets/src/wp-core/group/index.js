/**
 * Customize wp-group
 */

 /**
  * Extrnals
  */
const { addFilter } = wp.hooks;
const {
	PanelColorSettings,
	InspectorControls,
} = wp.blockEditor;

const { __ } = wp.i18n; 

/**
 * Internals
 */
import FullPagePanel from './withFullPage';
import GroupNamePanel from './withGropName';
import useVertical from './withVericalFlags';
import {withWpColors} from '../../components/colors';

// import {Group} from '../../local-react-components/blocks/group';
import Group from '../../local-react-components/blocks/group/group';

import ErrorBoundary from '../../local-react-components/components/Error';

const enableOnBlocks = [
    'core/group',
];

const WpGroup = ( 
    withWpColors('backgroundColor','textColor') (
            (props) => {
            
                const {textColor,setTextColor} = props;

                useVertical(props);
                console.log ('WpGroup : ', props);
                return (
                    [
                        <ErrorBoundary key={'panel-error'}>
                            
                            <FullPagePanel key='full-page-panel' {...props} />

                            <GroupNamePanel key='group-name-panel' {...props} />
                            
                            <InspectorControls>
                                <PanelColorSettings
                                    title={ __( 'Color Settings' ) }
                                    colorSettings={ [
                                        {
                                            value: textColor.color,
                                            onChange: setTextColor,
                                            label: __( 'Text Color' ),
                                        },
                                    ] }
                                />   

                            </InspectorControls>
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


const customGroup = 
    ( BlockEdit ) => {

            return props => {

                if ( ! enableOnBlocks.includes( props.name ) ) {

                    return (
                        <BlockEdit key="edit" { ...props } />
                    );
                } 

                return (
                        <WpGroup {...props}>
                            <BlockEdit {...props} />    
                        </WpGroup>
                );

            }
    };


addFilter( 'editor.BlockEdit', 'til/group/edit', customGroup );
