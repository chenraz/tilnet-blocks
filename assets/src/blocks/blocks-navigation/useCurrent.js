
/**
 * External dependencies
 */

const { useSelect,useDispatch } = wp.data;

const {useReducer} = wp.element;

const useCurrent = (clientId) => {

	const {
		updateBlockAttributes,
    } = useDispatch( 'core/block-editor' );
        
    const {
        innerBlocks
    } = useSelect ((select)=>{
		const {
			getBlock,
		} = select( 'core/block-editor' );

		const block = getBlock( clientId );

		return {
			innerBlocks: block.innerBlocks,
		};
    });

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
    
    return {...{
        // currentClientId,
        currentIndex,
        toggleCurrent,
        count,
    }}

}

export default useCurrent;

