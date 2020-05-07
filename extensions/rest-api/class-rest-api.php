<?php
/**
 * Rest Api
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Rest_Api')) :
    
//     include_once ('class-block-parser.php');
    
    
    final class Rest_Api  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;   
        
        protected static $extensions = null;


        /**
         * 
         */
        public function __construct ()
        {
            self::init_extensions();
//            self::add_actions();
        }

        /**
         * 
         */
        public static function init_extensions ()
        {
            self::$extensions = [
                'Block'         =>  Block::instance(),
                'Widget_Areas'  =>  Widget_Areas::instance(),
                'Gform'         =>  Gform::instance(),
                'Post_Type'     =>  Post_Type::instance(),
            ];
        }  


        /**
         * 
         */
        public static function add_actions () 
        {
        }
        
      

   
    }
    
endif;;