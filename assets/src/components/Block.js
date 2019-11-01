const {getSaveElement} = wp.blocks;

export default (blockObj) => {

	const Block = blockObj
		?	getSaveElement(blockObj.name, blockObj.attributes)
		: 	false

	return Block;

}