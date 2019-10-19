/**
 * Externals
 */
import { isUndefined, pickBy,isEmpty } from 'lodash';
const { withSelect } = wp.data;

/**
 * Internals
 */
import { 
	getBlocksTypesList, 
	getPostsTypesList, 
	getTaxonomiesList, 
	getPostsBlocks,
} from '../../utils';
import {getPostsTermsIds,getPostsTermsList} from '../../local-react-components/utils/selectors';

/**
 * 
 */
const withPostOptions = withSelect ((select,props)=>{
	
	const {getPostTypes,getTaxonomies} = select('core');
	const { getBlockTypes } = select('core/blocks');
	const { postType } = props.attributes;

	// console.log ('getting taxonomiesList');
	// const taxonomies = getTaxonomies({type: postType});
	// console.log ('got the typeof taxonomies',typeof taxonomies);

	const postsTypesList = getPostsTypesList(
		getPostTypes()
	);

	const blocksTypesList = getBlocksTypesList(
		getBlockTypes()
	);

	// const taxonomiesList = () => {
	// 	let taxonomiesList;
	// 	try {
	// 		console.log ('taxonomiesList trying');
	// 		taxonomiesList = getTaxonomiesList(
	// 			getTaxonomies({type: postType}
	// 		));
	// 	}
	// 	catch (e) {
	// 		console.log ('taxonomiesListcaught and error');
	// 		taxonomiesList = null;
	// 	}
	// 	console.log ('taxonomiesList returning:',taxonomiesList);
	// 	return taxonomiesList;
	// };
	// async function taxonomiesList () {
	// 	let taxonomiesList;
	// 	try {
	// 		taxonomiesList = getTaxonomiesList (
	// 			getTaxonomies({type: postType})
	// 		);
	// 	}
	// 	catch (e) {
	// 		console.log ('caught you motherfucker');
	// 		taxonomiesList = [];
	// 	}
	// 	finally {
	// 		console.log ('finally');
	// 	}

	// 	return taxonomiesList;

	// }
		
	const taxonomiesList = (
		getTaxonomiesList (
			getTaxonomies({type: postType})
		)		
	);

	return {
		postsTypesList: postsTypesList,
		blocksTypesList: blocksTypesList,
		taxonomiesList: taxonomiesList,
	};	

	// return {
	// 	postsTypesList: getPostsTypesList(
	// 		getPostTypes()
	// 	),
	// 	blocksTypesList: getBlocksTypesList(
	// 		getBlockTypes()
	// 	),
	// 	taxonomiesList: getTaxonomiesList(
	// 		getTaxonomies({type: postType})
	// 	),
	// };

});

/**
 * 
 */
const withSliderPosts = withSelect( ( select, props ) => {
	const { contentLayout, postsToShow, order, orderBy, postType,blockType,taxonomy } = props.attributes;
	const { getEntityRecords } = select( 'core' );
	
	const sliderPostsQuery = pickBy( {
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	
	const posts 	= getEntityRecords( 'postType', postType, sliderPostsQuery ); 
	
	let sliderPosts = [];
	if (posts && posts.length) {
		sliderPosts = 'blocks' === contentLayout
			?	getPostsBlocks (posts,blockType)
			:	posts;
	}

	const sliderPostsCount = sliderPosts
		?	sliderPosts.length
		:	0;

	const sliderTermsIds = (sliderPostsCount && taxonomy && taxonomy.length)
		?	getPostsTermsIds (posts,taxonomy)
		:	false;

	const sliderPostsTerms = (sliderTermsIds && sliderTermsIds.length ) 
		?	getEntityRecords ('taxonomy',taxonomy,{"include" : sliderTermsIds})
		:	[];

	const sliderTerms = (sliderPostsTerms && sliderPostsTerms.length) 
		?	getPostsTermsList (sliderPostsTerms, taxonomy)
		:	[];

	return {
		sliderPosts,
		sliderTerms,
		allowedNavigation: {
			right: sliderPostsCount > 1,
			left: sliderPostsCount > 1,
		},
	}
} );

export {withPostOptions,withSliderPosts}