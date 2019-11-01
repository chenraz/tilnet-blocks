
/**
 * External dependencies
 */

const {
	Toolbar,
	IconButton,
	BaseControl,
} = wp.components;

function BlocksNavigation ({
	count,
	currentIndex,
	toggleCurrent,
}) {
		
	const disabled = 2 > count;
	return (
		<Toolbar>
			<IconButton
				icon="controls-skipforward"
				label="last"
				onClick={()=>toggleCurrent('LAST')}
				disabled={disabled}
			/>						
			<IconButton
				icon="controls-forward"
				label="next"
				onClick={()=>toggleCurrent('NEXT')}
				disabled={disabled}
			/>	
			<BaseControl label={disabled ? count : (currentIndex + 1)} />
			<IconButton
				icon="controls-back"
				label="previous"
				onClick={()=>toggleCurrent('PREV')}
				disabled={disabled}
			/>	
			<IconButton
				icon="controls-skipback"
				label="first"
				onClick={()=>toggleCurrent('FIRST')}
				disabled={disabled}
			/>																	

		</Toolbar>	
	);
}

export default BlocksNavigation;

// export default compose( [
// 	withSelect( ( select, { clientId } ) => {
// 		const {
// 			getBlock,
// 		} = select( 'core/block-editor' );

// 		const block = getBlock( clientId );

// 		return {
// 			innerBlocks: block.innerBlocks,
// 		};
// 	} ),
// ] )( BlocksNavigation );

