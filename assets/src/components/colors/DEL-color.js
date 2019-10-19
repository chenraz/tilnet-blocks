
/**
 * Externals
 */


const {withSelect} = wp.data;

/**
 * Internals
 */
import {useAttributeClass} from '../useAttribute/useAttribute';
import {getColorClasses} from '../../utils/selectors';

/**
 * 
 * @param {*} colorContext 
 * @param {*} editorColors 
 * @param {*} props 
 */
const useColor = (colorContext,editorColors,props) => {

	console.log ('useColor before get class');
	const getClasses = (attributes) => getColorClasses(editorColors,colorContext,attributes);
	console.log ('useColor after get class');

	const colorClasses = useAttributeClass({
		attrClassName: getClasses,
	},props);
		
	return colorClasses;		

}

/**
 * 
 * @param  {...any} colorsContext 
 */
const useColorSelect = (colorContext,select,props) =>  { 

	const settings = select( 'core/block-editor' ).getSettings();
	const editorColors = settings.colors;

	console.log ('useColorSelect ',colorContext)

	return useColor(colorContext,editorColors,props)

}

/**
 * 
 * @param {*} colorContext 
 * @param {*} enableOnBlocks 
 */
const withColor = (colorContext,enableOnBlocks) => ( 
	withSelect((select,props) => {
		
		console.log ('withcolor withselect ', props,select);

		let newProps;
		const selectResults = useColorSelect(colorContext,select,props);

		if (enableOnBlocks.includes( props.name ) ) { 
			newProps = {
				...props,
				className: selectResults
			};
		}
		else {
			newProps = props;
		}	
		// if (! enableOnBlocks.includes( props.name ) ) { 
		// 	return props;
		// }		
		// const selectResults = useColorSelect(colorContext,select,props);
		// return {
		// 	...props,
		// 	className: selectResults
		// }
		return newProps;
	})
);

export {
	useColor,
	withColor,
	useColorSelect as default
};
