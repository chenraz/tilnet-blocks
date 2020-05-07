<?php
/**
 * Widget Areas
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Menu')) :
    
    final class Menu  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;   
        
        protected static $extensions = null;


        /**
         * 
         */
        public function __construct ()
        {
            self::init_extensions();
            self::add_actions();
        }

        public static function init_extensions ()
        {
            self::$extensions = [
            ];
        }


        /**
         * 
         */
        public static function add_actions () 
        {
            add_action ('rest_api_init',[__CLASS__,'register_rest_route']);
        }
        
        /**
         * 
         */
        public static function register_rest_route ()
        {
            register_rest_route('til/v1', '/menus/(?P<id>[a-zA-Z0-9_-]+)', array(
                'methods' => 'GET',
                'callback' => [__CLASS__,'get_data'],
            ) );            
        }
        
        public static function get_data ($data)
        {
            
            if (is_nav_menu($data['id'])) {
                if (is_int($data['id'])) {
                    $id = $data['id'];
                } else {
                    $id = wp_get_nav_menu_object($data['id']);
                }
                $menu = get_term($id);
                $menu->items = self::get_menu_items($id);
            } else {
                return new \WP_Error( 'not_found', 'No menu has been found with this id or slug: `'.$data['id'].'`. Please ensure you passed an existing menu ID, menu slug, location ID or location slug.', array( 'status' => 404 ) );
            }

            return $menu;            
        }
        
        /**
         * 
         * @param type $id
         * @return type
         */
        public static function get_menu_items($id)
        {
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

            // check if there is acf installed
            if (class_exists('acf')) {
                foreach ($menu_items as $menu_key => $menu_item) {
                    $fields = get_fields($menu_item->ID);
                    if (!empty($fields)) {
                        foreach ($fields as $field_key => $item) {
                            // add all acf custom fields
                            $menu_items[$menu_key]->$field_key = $item;
                        }
                    }
                }
            }
            return $menu_items;            
        }
    }
    
endif;;