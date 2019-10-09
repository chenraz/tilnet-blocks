
/**
 * Externals
 */

const {withSelect} = wp.data;
const { compose } = wp.compose;
const {
	withColors:wpWithColors,
} = wp.blockEditor;

import useColorSelect from './color';

const withWpColor = (colorContext) => (
	compose ([ 
		wpWithColors(colorContext),
		withSelect((select,props) => {
			
			const selectResults = useColorSelect(colorContext,select,props);
			return {
				...props,
				className: selectResults
			}
		})
	])
);

export default withWpColor;