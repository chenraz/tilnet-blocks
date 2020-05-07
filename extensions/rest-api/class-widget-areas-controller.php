<?php

/* 
 * Widget Areas Controller
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Widget_Areas_Controller')) :
    
    class Widget_Areas_Controller extends \WP_REST_Widget_Areas_Controller {
        
        /**
         * 
         */
	public function __construct() {
		$this->namespace = 'til/v1';
		$this->rest_base = 'widget-areas';
	}

        /**
         * 
         * @param type $request
         * @return boolean
         */
	public function get_items_permissions_check( $request ) {

            return true;
        } 
        
        /**
         * 
         * @param type $sidebar_id
         * @return type
         */
	protected function get_sidebar_data( $sidebar_id ) {
		$content_string = '';

		$post_id_referenced_in_sidebar = \Experimental_WP_Widget_Blocks_Manager::get_post_id_referenced_in_sidebar( $sidebar_id );

		if ( 0 !== $post_id_referenced_in_sidebar ) {
			$post           = get_post( $post_id_referenced_in_sidebar );
			$content_string = $post->post_content;
		} else {
			$blocks         = \Experimental_WP_Widget_Blocks_Manager::get_sidebar_as_blocks( $sidebar_id );
			$content_string = \Experimental_WP_Widget_Blocks_Manager::serialize_blocks( $blocks );
		}

		return array_merge(
			\Experimental_WP_Widget_Blocks_Manager::get_wp_registered_sidebars_sidebar( $sidebar_id ),
			array(
				'content' => array(
					'raw'           => $content_string,
					'rendered'      => apply_filters( 'the_content', $content_string ),
					'block_version' => block_version( $content_string ),
				),
                                'blocks'    =>  array_map(['\Tilnet\Rest_Api\Block', 'mapInnerBlocks'],$blocks)
			)
		);
	}        
    }
    
    
endif;

