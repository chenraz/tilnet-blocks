<?php
/**
 * Rest Api Post type Route
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Post_Type')) :
    
    final class Post_Type  {
        
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
            add_filter ('rest_prepare_post_type',[__CLASS__,'prepare_post_type'],10,3);
        }
        
        /**
         * 
         * @param type $response
         * @param type $post_type
         * @param type $request
         * @return type
         */
        public static function prepare_post_type ($response, $post_type, $request)
        {
            global $wp_meta_keys;
            $post_meta_keys = $wp_meta_keys['post'] ?? [];
            $post_type_meta_keys = $post_meta_keys[$post_type->name] ??[];
            
            if (! empty($post_type_meta_keys)) {
                $response->data['meta_keys'] = $post_type_meta_keys;
            }
            
            return $response;
        }
        
  

    }
    
endif;;