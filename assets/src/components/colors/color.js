
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

	const getClasses = (attributes) => getColorClasses(editorColors,colorContext,attributes);

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

	return useColor(colorContext,editorColors,props)

}

/**
 * 
 * @param {*} colorContext 
 * @param {*} enableOnBlocks 
 */
const withColor = (colorContext,enableOnBlocks) => ( 
	withSelect((select,props) => {
		
		if (! enableOnBlocks.includes( props.name ) ) { 
			return props;
		}
		const selectResults = useColorSelect(colorContext,select,props);
		return {
			...props,
			className: selectResults
		}
	})
);

export {
	useColor,
	withColor,
	useColorSelect as default
};
