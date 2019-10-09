const {useSelect} = wp.data;
const { registerPlugin } = wp.plugins;

import {MouseCursor as Mouse} from '../../local-react-components/components/mouseCursor';



const MouseCursor = () => {

    const hoverX = useSelect(select => select('til-data').getHoverX());
    const hoverY = useSelect(select => select('til-data').getHoverY());

    return <Mouse hoverX={hoverX} hoverY={hoverY} />

}

export default MouseCursor;

registerPlugin( 'plugin-tilnet-mouse-cursor', { render: MouseCursor, icon: 'palmtree' } );


