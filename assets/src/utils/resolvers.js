/**
 * Externals
 */
import { isUndefined, pickBy } from 'lodash';
const { withSelect } = wp.data;

/**
 * Internals
 */
import { 
	getBlocksTypesList, 
	getPostsTypesList, 
	getTaxonomiesList, 
	getPostsBlocks,
} from './index';
import {getPostsTermsIds,getPostsTermsList} from '../local-react-components/utils/selectors'

/**
 * 
 */
const withPostOptions = withSelect ((select,props)=>{
	
	const {getPostTypes,getPostType,getTaxonomies} = select('core');
	const { getBlockTypes } = select('core/blocks');
	const { postType } = props.attributes;


	const postsTypesList = getPostsTypesList(
		getPostTypes()
	);

	const blocksTypesList = getBlocksTypesList(
		getBlockTypes()
	);

	const taxonomiesList = (
		getTaxonomiesList (
			getTaxonomies({type: postType})
		)		
	);

	const postTypeEntity = postType
		?	getPostType(postType)
		:	{};

	return {
		postsTypesList: postsTypesList,
		blocksTypesList: blocksTypesList,
		taxonomiesList: taxonomiesList,
		postTypeEntity: postTypeEntity,
		metaObj: (! postTypeEntity || 'undefined' === typeof postTypeEntity.meta_keys)
			?	false
			:	postTypeEntity.meta_keys,
	};	


});

/**
 * 
 */
const withPosts = withSelect( ( select, props ) => {
	const { contentLayout, postsToShow, order, orderBy, postType,blockType,taxonomy } = props.attributes;
	const { getEntityRecords } = select( 'core' );
	
	const postsQuery = pickBy( {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	
	const rawPosts 	= getEntityRecords( 'postType', postType, postsQuery ); 
	
	let posts = [];
	if (rawPosts && rawPosts.length) {
		posts = 'blocks' === contentLayout
			?	getPostsBlocks (rawPosts,blockType)
			:	rawPosts;
	}

	const postsCount = posts
		?	posts.length
		:	0;

	const termsIds = (postsCount && taxonomy && taxonomy.length)
		?	getPostsTermsIds (rawPosts,taxonomy)
		:	false;

	const postTerms = (termsIds && termsIds.length ) 
		?	getEntityRecords ('taxonomy',taxonomy,{"include" : termsIds})
		:	[];

	const terms = (postTerms && postTerms.length) 
		?	getPostsTermsList (postTerms, taxonomy)
		:	[];

	return {
		posts,
		terms,
		allowedNavigation: {
			right: postsCount > 1,
			left: postsCount > 1,
		},
	}
} );

export {withPostOptions,withPosts}