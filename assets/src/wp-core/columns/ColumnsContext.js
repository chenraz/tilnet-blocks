
import {useState,createContext} from 'react';

const { useSelect } = wp.data;

const ColumnsProps =  createContext();
ColumnsProps.displayName = 'ColumnsProps';


const ColumnsContext = (props) => {

    const [columnsCount,setColumnsCount] = useState();
    // const attrs = props.attributes;

    const newColumnsCount = useSelect ((select)=>{
        const innerBlocks = select('core/block-editor').getBlocks(props.clientId);
        return innerBlocks.length;
    });

    if (newColumnsCount != columnsCount) {
        setColumnsCount(newColumnsCount);
    }

    return (
        <ColumnsProps.Provider {...props} value={{
            cols: columnsCount
        }}>
            {props.children}
        </ColumnsProps.Provider>
    );
}

export {
    ColumnsContext as default,
    ColumnsProps
}