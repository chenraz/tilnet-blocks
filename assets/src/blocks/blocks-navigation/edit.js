
/**
 * External dependencies
 */

const {
	InnerBlocks,
} = wp.blockEditor;

import useCurrent from './useCurrent'
import BlocksNavigation from './BlocksNavigation';
import createAppender from './appender';

const ALLOWED_BLOCKS = [ 'til/navigation-block' ];
const INITIAL_ATTS = {
	isCurrent: true,
}
const BLOCKS_TEMPLATE = [
	[ 'til/navigation-block',INITIAL_ATTS ]	
];

const BlocksEdit = ({
	clientId,
	currentIndex,
	toggleCurrent,	
}) => {

	const Appender = createAppender({...{
		currentIndex,
		toggleCurrent,
		clientId,
		initial_atts:INITIAL_ATTS
	}});

	return (
		<div className="blocks-navigation__inner-container">

			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				renderAppender={ Appender }
				template={BLOCKS_TEMPLATE}
			/>

		</div>
	);
}


function BlocksContainer ({
	className,
	clientId,
}) {

	const {currentIndex,toggleCurrent,count} = useCurrent(clientId);

	return (
		<div className={ className }>
			
			<BlocksNavigation {...{currentIndex,toggleCurrent,count}} />
			<BlocksEdit {...{clientId,currentIndex,toggleCurrent}} />
		</div>		
	)
}

export {
	BlocksContainer as default,
	BlocksEdit,
	BlocksNavigation,
	useCurrent,
}


