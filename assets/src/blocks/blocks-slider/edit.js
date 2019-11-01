/**
 * External dependencies
 */

const { withSelect } = wp.data;
const { compose } = wp.compose;
const { __ } = wp.i18n; 
const {
	InnerBlocks,
} = wp.editor

function SliderEdit ({
	className,
	hasInnerBlocks,
}) {

	return (
		<div className={ className }>
			<div className="wp-block-group__inner-container">
				<InnerBlocks
					renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</div>		
	)
}

export default compose( [
	withSelect( ( select, { clientId } ) => {
		const {
			getBlock,
		} = select( 'core/block-editor' );

		const block = getBlock( clientId );

		return {
			hasInnerBlocks: !! ( block && block.innerBlocks.length ),
		};
	} ),
] )( SliderEdit );