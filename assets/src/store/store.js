import {selectors,actions,initializeStore} from '../local-react-components/store';

const { registerGenericStore } = wp.data;
const reduxStore = initializeStore();

const mappedSelectors = Object.keys( selectors ).reduce( ( acc, selectorKey ) => {
	acc[ selectorKey ] = ( ...args ) =>
		selectors[ selectorKey ]( reduxStore.getState(), ...args );
	return acc;
}, {} );

const mappedActions = Object.keys( actions ).reduce( ( acc, actionKey ) => {
	acc[ actionKey ] = ( ...args ) => reduxStore.dispatch( actions[ actionKey ]( ...args ) );
	return acc;
}, {} );

const genericStore = {
	getSelectors() {
		return mappedSelectors;
	},
	getActions() {
		return mappedActions;
	},
	subscribe: reduxStore.subscribe,
};

registerGenericStore( 'til-data', genericStore );
