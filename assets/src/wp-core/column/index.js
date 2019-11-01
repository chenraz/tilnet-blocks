import {useContext} from 'react';
import {round} from 'lodash';

const { addFilter } = wp.hooks;

const enableOnBlocks = [
    'core/column',
];

import {ColumnsProps} from '../columns';


const customColumn = (
    ( BlockEdit ) => (
        (props) => {

            const columnsProps = useContext(ColumnsProps);

            if ( ! enableOnBlocks.includes( props.name ) ) {

                return (
                    <BlockEdit key="edit" { ...props } />
                );
            }  
            
            const {attributes,setAttributes} = props;

            const {width} = attributes;

            if (! width) {
                setAttributes({
                    width:  round(100/columnsProps.cols,6)
                })
            }
            
            return (
                <div>
                    <BlockEdit {...props} />
                </div>
            );
        }

    )

);

addFilter( 'editor.BlockEdit', 'til/column/edit', customColumn );
