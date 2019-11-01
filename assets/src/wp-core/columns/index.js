const { addFilter } = wp.hooks;
const { __ } = wp.i18n; 

const enableOnBlocks = [
    'core/columns',
];

import ColumnsContext,{ColumnsProps} from './ColumnsContext';
import Inspector from './Inspector';
// import {ColumnsProps} from './columns';
import Columns from './Columns';

const columnsHoc = (
    ( BlockEdit ) => (
        (props) => {
            if ( ! enableOnBlocks.includes( props.name ) ) {

                return (
                    <BlockEdit key="edit" { ...props } />
                );
            }
            
            return ([
                <Inspector key='inspector' {...props} />,
                <Columns key='columns' {...props}>
                    <BlockEdit {...props} />
                </Columns>
                // <ColumnsContext key='columns' {...props}>
                //     <BlockEdit {...props} />    
                // </ColumnsContext>

            ]);
        }
    )
);

export {
    ColumnsProps
}

addFilter( 'editor.BlockEdit', 'til/columns/edit', columnsHoc );




