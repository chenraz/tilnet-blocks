/**
 * External dependencies
 */

const { InnerBlocks } = wp.blockEditor;

export default function save(  ) {

	return (
		<div>
			<div className="wp-block-blocks-navigation__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}