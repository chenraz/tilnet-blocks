/**
 * External dependencies
 */

import classnames from 'classnames';
const { InnerBlocks, getColorClassName } = wp.blockEditor;

export default function save( { attributes,innerBlocks } ) {

	return (
		<div>
			<div className="wp-block-group__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}