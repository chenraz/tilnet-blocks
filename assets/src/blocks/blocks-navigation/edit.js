
/**
 * External dependencies
 */

const {
	InnerBlocks,
} = wp.blockEditor;

const {useDispatch} = wp.data;
const {createBlock} = wp.blocks;
const {
	IconButton,
} = wp.components;

import useCurrent from './useCurrent'
import BlocksNavigation from './BlocksNavigation';

const ALLOWED_BLOCKS = [ 'til/navigation-block' ];
const INITIAL_ATTS = {
	isCurrent: true,
}
const BLOCKS_TEMPLATE = [
	[ 'til/navigation-block',INITIAL_ATTS ]	
];


function BlocksContainer ({
	className,
	clientId,
}) {

	const {currentIndex,toggleCurrent,count} = useCurrent(clientId);

	const Appender = () => {

		const {insertBlock} = useDispatch('core/block-editor');
		const onAppend = () => {
			console.log ('try to append block');
			const newBlock = createBlock( 'til/navigation-block', INITIAL_ATTS );
	
			insertBlock( newBlock, (currentIndex + 1), clientId );
			toggleCurrent(newBlock.clientId);
		}
	
		return (
			<IconButton 
				onClick={onAppend} 
				icon="plus-alt"
				label="Add Navigation Block"			
			/>
		);
	}


	return (
		<div 
			className={ className }
			// onSelectionStart={()=>{console.log('onSelectionStart')}}
		>
			
			<BlocksNavigation {...{currentIndex,toggleCurrent,count}} />
			<div className="blocks-navigation__inner-container">

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ Appender }
					template={BLOCKS_TEMPLATE}
				/>

			</div>
		</div>		
	)
}

export default BlocksContainer;


