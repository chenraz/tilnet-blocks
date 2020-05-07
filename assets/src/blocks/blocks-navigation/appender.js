

const {useDispatch} = wp.data;
const {createBlock} = wp.blocks;
const {
	IconButton,
} = wp.components;


const createAppender = ({
    clientId,
    currentIndex=0,
    toggleCurrent,
    initial_atts={},
    label="Add Navigation Block",		
    icon="plus-alt"

}) => (
    () => {

        const {insertBlock} = useDispatch('core/block-editor');
        const onAppend = () => {

            
            const newBlock = createBlock( 'til/navigation-block', initial_atts );
    
            console.log ('on append newBlock: ', newBlock);

            insertBlock( newBlock, (currentIndex + 1), clientId );
            toggleCurrent(newBlock.clientId);
        }
    
        return (
            <IconButton 
                onClick={onAppend} 
                icon={icon}
                label={label}			
            />
        );
    }
);

export default createAppender;