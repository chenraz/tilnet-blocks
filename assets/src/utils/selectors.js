/**
 * Selectors
 */

 /**
  * Externals
  */
import { reduce, filter,map,flatten,kebabCase,isUndefined } from 'lodash';
const { createBlock } = wp.blocks;
const { __ } = wp.i18n;

/**
 * Internals
 */
import { API_NAMESPACE } from './constants';

/**
 * 
 * @param {*} blockTypes 
 */
export const getBlocksTypesList = (blockTypes) => reduce(
    blockTypes,
    ((r,v)=>{
        if(0===v.name.indexOf( API_NAMESPACE )){
            r.push({label:v.title,value:v.name});
        };
        return r;
    }),
    [{label:__("Select Block"),value: ""}]
);

/**
 * 
 * @param {*} postTypes 
 */
export const getPostsTypesList = (postTypes) => reduce(
    postTypes,
    ((results,value) => {
        results.push({
            label: value.name,
            value: value.slug
        });
        return results;
    }),
    []			
);

/**
 * 
 * @param {*} taxonomies 
 */
export const getTaxonomiesList = (taxonomies) => reduce (
    taxonomies,
    ((r,v)=>{
        r.push({label:v.name,value:v.slug});
        return r;
    }),
    [{label:__("Use Taxonomy"),value: ""}]				
)

/**
 * 
 * @param {*} posts 
 * @param {*} blockType 
 */
export const getPostsBlocks = (posts,blockType) => reduce (
	posts,
	((r,v)=>{
		if (v.blocks && v.blocks.length) {
			const blocks = reduce (
				v.blocks,
				((rr,vv)=>{
					if (vv.blockName == blockType) {
						rr.push({
							Block: createBlock(vv.blockName,vv.attrs)
						});
					}
					return rr;
				}),
				[]
			);
			if (blocks && blocks.length) {
				r.push({
					id: v.id,
					link: v.link,
					blocks: blocks
				});
			}
		}
		return r;	
	}),
	[]
);

/**
 * Find block that match name and className
 * 
 * @param {*} blocks 
 * @param {*} blockName 
 * @param {*} className 
 */
export const getBlockByClassName = (blocks,blockName,className) => filter(blocks,(block)=>{
	return (
		block.name == blockName
		&& block.attributes.className && block.attributes.className.includes(className)
	);
});

/**
 * 
 * @param {*} editorColors 
 * @param {*} colorContext 
 * @param {*} attributes 
 */
export const getColorClasses = (editorColors,colorContext,attributes) => ( 
	flatten(
		map(editorColors,(color) => {
			const colorClass = `has-${color.class}-${kebabCase(colorContext)}`;
			
			const hasColor	= 
				! isUndefined(attributes[colorContext])
				&& color.class == kebabCase(attributes[colorContext]);

			let results = new Object;

			results[colorClass] = hasColor;

			return results;

		})
	)
);

/**
 * 
 * @param {*} editorColors 
 * @param {*} colorsContext 
 * @param {*} attributes 
 */
export const getColorsClasses = (editorColors, colorsContext,attributes) => (
	map(colorsContext,(colorContext) => 
		getColorClasses(colorContext,editorColors,attributes)
	)
);

