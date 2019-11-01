
/**
 * External dependencies
 */

const { withSelect,useDispatch } = wp.data;
const { compose } = wp.compose;

const {
	Toolbar,
	IconButton,
	BaseControl,
} = wp.components;

const {useReducer} = wp.element;

function BlocksNavigation ({
	innerBlocks,
}) {
	
	const count	=	innerBlocks.length;

	const getIndex = (clientId) => {
		let index = -1;
		innerBlocks.every((b,i)=>{
			if (b.clientId === clientId) {
				index = i;
				return false;
			}

			return true;
		});	

		return index;
	}

	const {
		updateBlockAttributes,
	} = useDispatch( 'core/block-editor' );
	
	const reducer = (currentClientId,action) => {

		if (1 > count) {
			return -1;
		}

		let newCurrent = -1;

		if (2 > count) {
			newCurrent = 0;
		}

		const current = getIndex (currentClientId);

		if (0 > newCurrent) {

			switch (action) {
				case 'NEXT':
					newCurrent = (current>=(count -1))
						?	0
						:	(current + 1);
					break;
				case 'PREV':
					newCurrent = (0 >= current)
						?	(count -1 )
						:	(current -1);
					break;
				case 'LAST':
					newCurrent = (count - 1);
					break;
				default:
					const actionIndex = getIndex(action);
					newCurrent = (actionIndex && 0<= actionIndex)
						?	actionIndex
						:	0;
			}
		}

		const newCurrentClientId = innerBlocks[newCurrent].clientId;

		if (newCurrentClientId != currentClientId) {
			if (0 <= current) {
				updateBlockAttributes(currentClientId,{
					isCurrent: false
				})
			}	

			updateBlockAttributes(newCurrentClientId,{
				isCurrent: true
			})
		}

		return newCurrentClientId;
	};

	const [currentClientId,toggleCurrent] = useReducer (reducer,-1);
	
	const currentIndex = getIndex(currentClientId);
	
	if ( 0 > currentIndex && 0 < count) {
		toggleCurrent(innerBlocks[0].clientId);
	}

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
			<BaseControl label={disabled ? '' : (currentIndex + 1)} />
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

export default compose( [
	withSelect( ( select, { clientId } ) => {
		const {
			getBlock,
		} = select( 'core/block-editor' );

		const block = getBlock( clientId );

		return {
			innerBlocks: block.innerBlocks,
		};
	} ),
] )( BlocksNavigation );

