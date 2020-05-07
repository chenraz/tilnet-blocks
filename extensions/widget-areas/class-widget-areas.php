<?php
/**
 * Widget Areas
 */

namespace Tilnet\Widget_Areas;

if (!class_exists('\Tilnet\Widget_Areas\Widget_Areas')) :
    
    final class Widget_Areas  {
        
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
            add_action( 'widgets_init',[__CLASS__,'register_sidebars']);
        }
        
        /**
         * 
         */
        public static function register_sidebars() {
            register_sidebar ([
                'name'          =>  __('Header Right','tilnet-blocks'),
                'id'            =>  'header-right',
                'description'   =>  __('Right side site header','tilnet-blocks'),
                
            ]);
            
            register_sidebar ([
                'name'          =>  __('Left Header','tilnet-blocks'),
                'id'            =>  'header-left',
                'description'   =>  __('Left side site header','tilnet-blocks'),
                
            ]);     
            
            register_sidebar ([
                'name'          =>  __('Portfolios','tilnet-blocks'),
                'id'            =>  'protfolio-right',
                'description'   =>  __('Portfolios right sidebar','tilnet-blocks'),
                
            ]);              
        }
    }
    
endif;;