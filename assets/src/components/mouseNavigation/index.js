
const { useDispatch } = wp.data;
const { createHigherOrderComponent } = wp.compose;
const { useCallback } = wp.element;


import {WithMouseNavigation} from '../../local-react-components/components/mouseNavigation'

const MouseNavigator = ({hoverX,setHoverX,WrappedComponent,...props}) => { 
    return WithMouseNavigation({hoverX,setHoverX})(WrappedComponent)(props);
}

export default createHigherOrderComponent(
    ( WrappedComponent ) => (
        props => {
            const {setHoverX: hoverXSetter} = useDispatch('til-data');
            const setHoverX = useCallback(hoverXSetter,[]);

            return <MouseNavigator {...props} WrappedComponent={WrappedComponent} setHoverX={setHoverX} />
        }
    ),
    "WithMouseNavigation"
);


