<?php
/**
 * Blok
 */

namespace Tilnet\Block;

if (!class_exists('\Tilnet\Reusable_Block')) :
    
     include_once ('class-block-parser.php');
    
    
    final class Reusable_Block  {
        
        use \Tilnet\One_Instance;
        
        /**
         *
         * @var type 
         */
        protected static  $instance = null;    
        
        /**
         *
         * @var type 
         */
        public static $extensions = [];        
        
        /**
         * 
         */
        public function __construct ()
        {
            self::add_actions();
        }
        

        public static function add_actions () 
        {
            
            add_action('init',[__CLASS__,'register_block_template']);
            add_filter( 'term_updated_messages', [__CLASS__,'block_template_updated_messages'] );

            add_filter('register_post_type_args',[__CLASS__,'post_type_args']);
            add_filter ('manage_wp_block_posts_columns',[__CLASS__,'posts_columns']);
            add_action ('manage_wp_block_posts_custom_column',[__CLASS__,'posts_columns_custom_column'],10,2);

//            add_action('admin_menu',[__CLASS__,'admin_menu_page']);
        }
        
        /**
         * 
         */
        public static function register_block_template() 
        {
            register_taxonomy( 'block_template', array( 'wp_block' ), array(
                    'hierarchical'      => true,
                    'public'            => true,
                    'show_in_nav_menus' => true,
                    'show_ui'           => true,
                    'show_admin_column' => false,
                    'query_var'         => true,
                    'rewrite'           => true,
                    'capabilities'      => array(
                            'manage_terms'  => 'edit_posts',
                            'edit_terms'    => 'edit_posts',
                            'delete_terms'  => 'edit_posts',
                            'assign_terms'  => 'edit_posts',
                    ),
                    'labels'            => array(
                            'name'                       => __( 'Templates', 'tilnet-blocks' ),
                            'singular_name'              => _x( 'Template', 'taxonomy general name', 'tilnet-blocks' ),
                            'search_items'               => __( 'Search Templates', 'tilnet-blocks' ),
                            'popular_items'              => __( 'Popular Templates', 'tilnet-blocks' ),
                            'all_items'                  => __( 'All Templates', 'tilnet-blocks' ),
                            'parent_item'                => __( 'Parent Template', 'tilnet-blocks' ),
                            'parent_item_colon'          => __( 'Parent Template:', 'tilnet-blocks' ),
                            'edit_item'                  => __( 'Edit Template', 'tilnet-blocks' ),
                            'update_item'                => __( 'Update Template', 'tilnet-blocks' ),
                            'view_item'                  => __( 'View Template', 'tilnet-blocks' ),
                            'add_new_item'               => __( 'Add New Template', 'tilnet-blocks' ),
                            'new_item_name'              => __( 'New Template', 'tilnet-blocks' ),
                            'separate_items_with_commas' => __( 'Separate Templates with commas', 'tilnet-blocks' ),
                            'add_or_remove_items'        => __( 'Add or remove Templates', 'tilnet-blocks' ),
                            'choose_from_most_used'      => __( 'Choose from the most used Templates', 'tilnet-blocks' ),
                            'not_found'                  => __( 'No Templates found.', 'tilnet-blocks' ),
                            'no_terms'                   => __( 'No Templates', 'tilnet-blocks' ),
                            'menu_name'                  => __( 'Templates', 'tilnet-blocks' ),
                            'items_list_navigation'      => __( 'Templates list navigation', 'tilnet-blocks' ),
                            'items_list'                 => __( 'Templates list', 'tilnet-blocks' ),
                            'most_used'                  => _x( 'Most Used', 'block_template', 'tilnet-blocks' ),
                            'back_to_items'              => __( '&larr; Back to Templates', 'tilnet-blocks' ),
                    ),
                    'show_in_rest'      => true,
                    'rest_base'         => 'block_template',
                    'rest_controller_class' => 'WP_REST_Terms_Controller',
            ) );
            
        }
        
        /**
         * 
         * @param type $messages
         * @return type
         */
        public static function block_template_updated_messages ($messages)
        {
            $messages['block_template'] = array(
                    0 => '', // Unused. Messages start at index 1.
                    1 => __( 'Template added.', 'tilnet-blocks' ),
                    2 => __( 'Template deleted.', 'tilnet-blocks' ),
                    3 => __( 'Template updated.', 'tilnet-blocks' ),
                    4 => __( 'Template not added.', 'tilnet-blocks' ),
                    5 => __( 'Template not updated.', 'tilnet-blocks' ),
                    6 => __( 'Templates deleted.', 'tilnet-blocks' ),
            );

            return $messages;
            
        }


        /**
         * 
         * @param type $args
         * @return string
         */
        public static function post_type_args ($args)
        {
            if (! isset($args['rest_base']) || 'blocks' !== $args['rest_base']) {
                return $args;
            }
            
            if (! isset($args['taxonomies'])) {
                $args['taxonomies'] = [];
            }
            
            if (!array_key_exists('block_template', $args['taxonomies'])) {
                $args['taxonomies'][] = 'block_template';
            }
            
            return $args;
        }
        
        /**
         * 
         * @param type $_columns
         * @return type
         */
        public static function posts_columns($_columns) 
        {
            
            $columns = [];
            
            foreach ($_columns as $name => $col) {
                $columns[$name] = $col;
                if ('title' === $name) {
                    $columns['template'] = __("Template",'tilnet-blocks');
                }
            }
            return $columns;
        }
        
        /**
         * 
         * @param type $name
         * @param type $post_id
         * @return type
         */
        public static function posts_columns_custom_column ($name,$post_id)
        {
            if ('template' !== $name) {
                return;
            }
            
            echo get_the_term_list( $post_id, 'block_template', '', ', ', '' );
        }
        
        public static function admin_menu_page() 
        {
            add_menu_page(
                __("Blocks",'tilnet-blocks'), // page_title
                __("Blocks",'tilnet-blocks'), // menu_title
                'manage_options', //capability
                'edit.php?post_type=wp_block', // menu_slug
                '', //function, 
                'dashicons-layout', // icon_url
                6 // position
            );
            
            add_submenu_page(
                'edit.php?post_type=wp_block', // parent_slug
                '', //page_title
                __('Templates','tilnet-blocks'), // menu_title
                'manage_options', //capability
                'edit-tags.php?taxonomy=block_template&post_type=wp_block', //menu_slug
                '' //function
            );
        }
        
    }
    
endif;