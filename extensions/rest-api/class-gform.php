<?php
/**
 * Gravity Forms
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Gform')) :
    
    final class Gform  {
        
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
            add_action( 'rest_api_init', [__CLASS__,'register_route']);
        }
        
        /**
         * 
         */
        public static function register_route ()
        {
            $controller = new Gform_Controller();
            $controller->register_routes();            
        }
        
 
    }
    
endif;;