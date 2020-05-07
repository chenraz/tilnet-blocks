const { InnerBlocks } = wp.blockEditor;

export default function save(  ) {

	return (
        <div className="wp-block-til-card">
            <InnerBlocks.Content />
        </div>
	);
}