
const { useDispatch } = wp.data;
const { createHigherOrderComponent } = wp.compose;
const { useCallback } = wp.element;


import {withMouseNavigation} from '../../local-react-components/components/mouseNavigation'

const MouseNavigator = ({setHoverX,WrappedComponent,...props}) => { 
    return withMouseNavigation({setHoverX})(WrappedComponent)(props);
}

export default createHigherOrderComponent(
    ( WrappedComponent ) => (
        props => {
            const {setHoverX: hoverXSetter} = useDispatch('til-data');
            const setHoverX = useCallback(hoverXSetter,[]);

            return <MouseNavigator {...props} WrappedComponent={WrappedComponent} setHoverX={setHoverX} />
        }
    ),
    "withMouseNavigation"
);


