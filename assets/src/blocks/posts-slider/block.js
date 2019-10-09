export default ({post}) => {
	
	const blockObj = post.blocks && post.blocks.length 
		? post.blocks[0].Block
		: false;	
	
	return blockObj && getSaveElement(blockObj.name, blockObj.attributes);

}