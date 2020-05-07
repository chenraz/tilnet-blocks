<?php
/**
 * Rest Api Widgets Area
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Widget_Areas')) :
    
    final class Widget_Areas  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;   
        
        protected static $extensions = null;


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
            add_action( 'rest_api_init', [__CLASS__,'register_route']);
            add_filter('widget_display_callback',[__CLASS__,'reusable_block_display'],10,3);
            add_filter('widget_display_callback',[__CLASS__,'menu_display'],10,3);
        }
        
        /**
         * 
         */
        public static function register_route ()
        {
            $controller = new Widget_Areas_Controller();
            $controller->register_routes();            
        }
        
        /**
         * 
         * @param type $instance
         * @param type $object
         * @param type $args
         * @return type
         */
        public static function reusable_block_display ($instance, $object, $args)
        {
            $ref        =   $instance['block_id'] ?? false;
            if (! $ref) {
                return $instance;
            }
            
            $post           =   get_post($ref);
            
            if ($post) {
                $instance['blocks']         =   parse_blocks($post->post_content);         
            }
            
//            $attrs          = \Tilnet\Block\Block_Parser::ref_block_attrs($ref);
            
//            $blocks     =   \Tilnet\Block\Block_Parser::ref_block_attrs($ref);
//            if (! $blocks) {
//                return $instance;
//            }
            
//            return array_merge($instance,$attrs);
            return $instance;
        }
        
        /**
         * 
         * @param type $instance
         * @param type $object
         * @param type $args
         * @return type
         */
        public static function menu_display ($instance, $object, $args)
        {
            $nav_menu = $instance['nav_menu'] ?? false;
            
            if (! $nav_menu) {
                return $instance;
            }
            
            $instance['menu'] = self::get_menu($nav_menu);
            
//            return array_merge($instance,$menu);
            return $instance;
        }  
        
        /**
         * 
         * @param type $id
         * @return type
         */
        public static function get_menu ($id)
        {
            $menu = get_term($id);

            $menu_items = wp_get_nav_menu_items($id);

            // wordpress does not group child menu items with parent menu items
            $child_items = [];
            // pull all child menu items into separate object
            foreach ($menu_items as $key => $item) {
                if ($item->menu_item_parent) {
                    array_push($child_items, $item);
                    unset($menu_items[$key]);
                }
            }

            // push child items into their parent item in the original object
            foreach ($menu_items as $item) {
                foreach ($child_items as $key => $child) {
                    if ($child->menu_item_parent == $item->ID) {
                        if (!$item->child_items) $item->child_items = [];
                        array_push($item->child_items, $child);
                        unset($child_items[$key]);
                    }
                }
            }

            $menu->items= $menu_items;
            return $menu;            
        }        

    }
    
endif;;