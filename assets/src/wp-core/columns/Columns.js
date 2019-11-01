
// const { addFilter } = wp.hooks;
// const { __ } = wp.i18n; 

// const enableOnBlocks = [
//     'core/columns',
// ];

import ColumnsContext,{ColumnsProps} from './ColumnsContext';
import { maxWidth } from '@material-ui/system';
// import Inspector from './Inspector';

const Columns = (props) => {

    const {attributes} = props;
    const {width} = attributes;

    const style = (100 === width)
        ?   {}
        :   {
            display: 'inline-block',
            width: `${width}%`,
            position: 'relative',
            right: `${(100-width)/2}%`
        }

    return (
        <div style={style}>
            <ColumnsContext key='columns' {...props}>
                {props.children}   
            </ColumnsContext>    
        </div>
                
    );   
}

// const columnsHoc = (
//     ( BlockEdit ) => (
//         (props) => {
//             if ( ! enableOnBlocks.includes( props.name ) ) {

//                 return (
//                     <BlockEdit key="edit" { ...props } />
//                 );
//             }
            
//             return ([
//                 <Inspector key='inspector' {...props} />,
//                 <ColumnsContext key='columns' {...props}>
//                     <BlockEdit {...props} />    
//                 </ColumnsContext>

//             ]);
//         }
//     )
// );

export {
    Columns as default,
    ColumnsProps
}

// addFilter( 'editor.BlockEdit', 'til/columns/edit', columnsHoc );
