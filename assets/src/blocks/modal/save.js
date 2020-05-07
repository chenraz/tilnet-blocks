const { InnerBlocks } = wp.blockEditor;


export default function save( { attributes,innerBlocks } ) {

	return (
			<div className="wp-block-modal__inner-container">
				<InnerBlocks.Content />
			</div>
	);
}

