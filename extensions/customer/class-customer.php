<?php

/* 
 * Customer  
 */

namespace Tilnet\Customer;

if (!class_exists('\Tilnet\Customer\Customer')) :
    
    final class Customer  {
        
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

            register_post_type( 'customer', array(
                    'labels'                => array(
                            'name'                  => __( 'Customers', 'tilnet-blocks' ),
                            'singular_name'         => __( 'Customer', 'tilnet-blocks' ),
                            'all_items'             => __( 'All Customers', 'tilnet-blocks' ),
                            'archives'              => __( 'Customer Archives', 'tilnet-blocks' ),
                            'attributes'            => __( 'Customer Attributes', 'tilnet-blocks' ),
                            'insert_into_item'      => __( 'Insert into Customer', 'tilnet-blocks' ),
                            'uploaded_to_this_item' => __( 'Uploaded to this Customer', 'tilnet-blocks' ),
                            'featured_image'        => _x( 'Featured Image', 'customer', 'tilnet-blocks' ),
                            'set_featured_image'    => _x( 'Set featured image', 'customer', 'tilnet-blocks' ),
                            'remove_featured_image' => _x( 'Remove featured image', 'customer', 'tilnet-blocks' ),
                            'use_featured_image'    => _x( 'Use as featured image', 'customer', 'tilnet-blocks' ),
                            'filter_items_list'     => __( 'Filter Customers list', 'tilnet-blocks' ),
                            'items_list_navigation' => __( 'Customers list navigation', 'tilnet-blocks' ),
                            'items_list'            => __( 'Customers list', 'tilnet-blocks' ),
                            'new_item'              => __( 'New Customer', 'tilnet-blocks' ),
                            'add_new'               => __( 'Add New', 'tilnet-blocks' ),
                            'add_new_item'          => __( 'Add New Customer', 'tilnet-blocks' ),
                            'edit_item'             => __( 'Edit Customer', 'tilnet-blocks' ),
                            'view_item'             => __( 'View Customer', 'tilnet-blocks' ),
                            'view_items'            => __( 'View Customers', 'tilnet-blocks' ),
                            'search_items'          => __( 'Search Customers', 'tilnet-blocks' ),
                            'not_found'             => __( 'No Customers found', 'tilnet-blocks' ),
                            'not_found_in_trash'    => __( 'No Customers found in trash', 'tilnet-blocks' ),
                            'parent_item_colon'     => __( 'Parent Customer:', 'tilnet-blocks' ),
                            'menu_name'             => __( 'Customers', 'tilnet-blocks' ),
                    ),
                    'public'                => true,
                    'hierarchical'          => false,
                    'show_ui'               => true,
                    'show_in_nav_menus'     => true,
                    'supports'              => array('title', 'editor','thumbnail' ),
//                    'supports'              => array( 'title', 'thumbnail' ),
                    'has_archive'           => true,
                    'rewrite'               => true,
                    'query_var'             => true,
                    'menu_position'         => null,
                    'menu_icon'             => 'dashicons-businessman',
                    'show_in_rest'          => true,
                    'rest_base'             => 'customer',
//                    'rest_controller_class' => 'WP_REST_Posts_Controller',
            ) );
            
            
        }
        

        

    }
    
endif;

