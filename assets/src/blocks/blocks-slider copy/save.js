/**
 * External dependencies
 */

import classnames from 'classnames';
const { InnerBlocks, getColorClassName } = wp.blockEditor;

export default function save( { attributes,innerBlocks } ) {
// export default function save( {innerBlocks} ) {
	
	// const {innerBlocks} = attributes;

	console.log ('save blocksslider:',innerBlocks);
	
	const { backgroundColor, customBackgroundColor } = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const className = classnames( backgroundClass, {
		'has-background': backgroundColor || customBackgroundColor,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
	};

	return (
		<div className={ className } style={ styles }>
			<div className="wp-block-group__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}