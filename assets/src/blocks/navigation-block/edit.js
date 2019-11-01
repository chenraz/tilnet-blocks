/**
 * External dependencies
 */

const { withSelect } = wp.data;
const { compose } = wp.compose;
const { __ } = wp.i18n; 

const {
	InnerBlocks,
} = wp.blockEditor;

function NavigationBlock (props) {

	const {
		isSelected,
		hasSelectedInnerBlock,
		attributes,
	} = props;

	const {isCurrent} = attributes;

	const toShow = isSelected || hasSelectedInnerBlock || isCurrent;
	return (
		<div >
			<div className="wp-block-group__inner-container">

				{ toShow &&
					<InnerBlocks
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				}
			</div>
		</div>
	)
}

export default compose([
	withSelect ((select,ownProps) => {
		const {
			hasSelectedInnerBlock,
		} = select( 'core/block-editor' );

		const {clientId} = ownProps;

		return {
			hasSelectedInnerBlock: hasSelectedInnerBlock(clientId),
		}
	})
])(NavigationBlock);