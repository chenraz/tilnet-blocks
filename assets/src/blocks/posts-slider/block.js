const {getSaveElement} = wp.blocks;

export default ({post}) => {
	
	const blockObj = post.blocks && post.blocks.length 
		? post.blocks[0].Block
		: false;	

	const block = blockObj
		?	getSaveElement(blockObj.name, blockObj.attributes)
		: 	false

	console.log ("got the Block",block);

	return block;
	
	// return blockObj && getSaveElement(blockObj.name, blockObj.attributes);

}