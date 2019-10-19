<?php

/* 
 * Review  
 */

namespace Tilnet\Review;

if (!class_exists('\Tilnet\Review\Review')) :
    
    final class Review  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;     
        
        /**
         * 
         */
        public function __construct ()
        {
            self::add_actions();
        }
        
        /**
         * 
         */
        public static function add_actions () 
        {
            add_action( 'init', [__CLASS__,'register_post_type'] );
        }
        
        /**
         * 
         */
        public static function register_post_type ()
        {
            register_post_type( 'review', array(
                'labels'                => array(
                    'name'                  => __( 'Reviews', 'tilnet-blocks' ),
                    'singular_name'         => __( 'Review', 'tilnet-blocks' ),
                    'all_items'             => __( 'All Reviews', 'tilnet-blocks' ),
                    'archives'              => __( 'Review Archives', 'tilnet-blocks' ),
                    'attributes'            => __( 'Review Attributes', 'tilnet-blocks' ),
                    'insert_into_item'      => __( 'Insert into Review', 'tilnet-blocks' ),
                    'uploaded_to_this_item' => __( 'Uploaded to this Review', 'tilnet-blocks' ),
                    'featured_image'        => _x( 'Featured Image', 'review', 'tilnet-blocks' ),
                    'set_featured_image'    => _x( 'Set featured image', 'review', 'tilnet-blocks' ),
                    'remove_featured_image' => _x( 'Remove featured image', 'review', 'tilnet-blocks' ),
                    'use_featured_image'    => _x( 'Use as featured image', 'review', 'tilnet-blocks' ),
                    'filter_items_list'     => __( 'Filter Reviews list', 'tilnet-blocks' ),
                    'items_list_navigation' => __( 'Reviews list navigation', 'tilnet-blocks' ),
                    'items_list'            => __( 'Reviews list', 'tilnet-blocks' ),
                    'new_item'              => __( 'New Review', 'tilnet-blocks' ),
                    'add_new'               => __( 'Add New', 'tilnet-blocks' ),
                    'add_new_item'          => __( 'Add New Review', 'tilnet-blocks' ),
                    'edit_item'             => __( 'Edit Review', 'tilnet-blocks' ),
                    'view_item'             => __( 'View Review', 'tilnet-blocks' ),
                    'view_items'            => __( 'View Reviews', 'tilnet-blocks' ),
                    'search_items'          => __( 'Search Reviews', 'tilnet-blocks' ),
                    'not_found'             => __( 'No Reviews found', 'tilnet-blocks' ),
                    'not_found_in_trash'    => __( 'No Reviews found in trash', 'tilnet-blocks' ),
                    'parent_item_colon'     => __( 'Parent Review:', 'tilnet-blocks' ),
                    'menu_name'             => __( 'Reviews', 'tilnet-blocks' ),
                ),
                'public'                => true,
                'hierarchical'          => false,
                'show_ui'               => true,
                'show_in_nav_menus'     => true,
                'supports'              => array( 'editor' ),
                'has_archive'           => true,
                'rewrite'               => true,
                'query_var'             => true,
                'menu_position'         => null,
                'menu_icon'             => 'dashicons-format-quote',
                'show_in_rest'          => true,
                'rest_base'             => 'review',
//                'rest_controller_class' => 'WP_REST_Posts_Controller',
                'template'              => [
                    ['til/review', []]
                ],
            ) );
            
        }
        

    }
    
endif;

