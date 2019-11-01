<?php
/**
 * Blok
 */

namespace Tilnet\Block;

if (!class_exists('\Tilnet\Block')) :
    
     include_once ('class-block-parser.php');
    
    
    final class Block  {
        
        use \Tilnet\One_Instance;
        
        protected static  $instance = null;    
        
        /**
         * 
         */
        public function __construct ()
        {
            self::add_actions();
        }
        
        public static function add_actions () 
        {
            
            // Assets
            add_action( 'init', [__CLASS__,'register_assets'],5 );
            add_action ('enqueue_block_editor_assets',[__CLASS__,'enqueue_styles']);
            
            // media
//            add_filter('upload_mimes', [__CLASS__,'mime_types']);
            
            // Blocks
            add_action ('after_setup_theme',[__CLASS__,'set_color_palette'],1000);
            
            add_action( 'init', [__CLASS__,'register_blocks'] );            
            add_action ('init',[__CLASS__,'register_blocks_style']);
            
            add_filter( 'block_categories', [__CLASS__,'block_categories'] );
            
            add_filter( 'block_parser_class', [__CLASS__,'block_parser_class']);
            
            
        }
        
        /**
         * 
         */
        public static function register_assets ()
        {
            
            error_log ('url: ' . \Tilnet\TIL()::$url . '/assets/dist/editor-style.css');
            
            // general editor style
            wp_register_style (
                'tilnet-blocks-editor-general',
                \Tilnet\TIL()::$url . '/assets/dist/editor-style.css',
//                plugins_url ('editor-style.css',__FILE__),
                ['wp-editor'],
                null
            );

            // Enqueue block editor JS
            wp_register_script(
                'tilnet/editor-scripts',
                \Tilnet\TIL()::$url . '/assets/dist/build.js',
                ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n','wp-plugins' ],
                filemtime( \Tilnet\TIL()::$dir . '/assets/dist/build.js' ) 
            );
 
        }
        
        /**
         * 
         */
        public static function set_color_palette ()
        {
            add_theme_support( 'editor-color-palette', array(
                array(
                    'name'  => __( 'Almost Black', 'tilnet-blocks' ),
                    'slug'  => 'almost_black',
                    'color' => '#021420',
                    'class' =>  'almost-black',
               ),                
                array(
                    'name'  => __( 'Blue', 'tilnet-blocks' ),
                    'slug'  => 'blue',
                    'color'	=> '#03456d',
                    'class' =>  'blue',
                ),
                array(
                    'name'  => __( 'Yellow', 'tilnet-blocks' ),
                    'slug'  => 'yellow',
                    'color' => '#ffd820',
                    'class' =>  'yellow',
                ),
                array(
                    'name'  => __( 'Almost White', 'tilnet-blocks' ),
                    'slug'  => 'almost_white',
                    'color' => '#e6eef2',
                    'class' =>  'almost-white',
               ),
                array (
                    'name'  => __( 'Radial Yellow', 'tilnet-blocks' ),
                    'slug'  => 'radial_yellow',
                    'color' => '#fcd03f',                    
                    'class' =>  'radial-yellow',
                ),
                array (
                    'name'  => __( 'Radial Blue', 'tilnet-blocks' ),
                    'slug'  => 'radial_blue',
                    'color' => '#02456d',                    
                    'class' =>  'radial-blue',
                ),    
                array (
                    'name'  => __( 'Radial Gray', 'tilnet-blocks' ),
                    'slug'  => 'radial_gray',
                    'color' => '#f8fafc',                    
                    'class' =>  'radial-gray',
                ),                   
            ) );
        }           
        
        /**
         * 
         */
        public static function enqueue_styles ()
        {
            wp_enqueue_style('tilnet-blocks-editor-general');

        }   
        
//        public static function mime_types($mimes)
//        {
//            $mimes['svg'] = 'image/svg+xml';
//            return $mimes;            
//        }

        /**
         * 
         */
        public static function register_blocks ()
        {
            // wellcome block
            register_block_type(
                'til/wellcome', array(
                    // 'style'         => 'tilnet/stylesheets',
                    'editor_script' => 'tilnet/editor-scripts',
                    'editor_style'  => 'tilnet/stylesheets',
                )
            );    

            // slider block
            register_block_type(
                'til/blocks-slider', array(
                    // 'style'         => 'tilnet/stylesheets',
                    'editor_script' => 'tilnet/editor-scripts',
                    'editor_style'  => 'tilnet/stylesheets',
                )
            );        
            
            // review block
            register_block_type(
                'til/review', array(
                    'editor_script' => 'tilnet/editor-scripts',
                    'editor_style'  => 'tilnet/stylesheets',
                )
            );      
            
            // review block
            register_block_type(
                'til/card', array(
                    'editor_script' => 'tilnet/editor-scripts',
                    'editor_style'  => 'tilnet/stylesheets',
                )
            );               
        }   
        
        /**
         * 
         */
        public static function register_blocks_style ()
        {
            
            register_block_style(
                'core/heading',
                array(
                    'name'         => 'horizontal',
                    'label'        => __( 'Horizontal' ),
                    'isDefault'    =>  true,
                )
            );      
            
            register_block_style(
                'core/heading',
                array(
                    'name'         => 'vetical',
                    'label'        => __( 'Vetical' ),
                    'inline_style' => '.wp-block-heading .is-style-vetical { transform: rotate(-90deg);position: absolute; }',
                )
            );              
        }        
        
        /**
         * 
         * @param type $cats
         * @return type
         */
        public static function block_categories ($cats)
        {
            return array_merge(
                $cats,
                [
                    [
                        'slug' => 'til-blocks',
                        'title' => __( 'Tilnet Blocks'),
                        'icon'  => 'admin-site-alt3',                
                    ]
                ]
            );            
        }
        
        /**
         * 
         * @param type $class
         * @return string
         */
        public static function block_parser_class ($class)
        {
            return '\Tilnet\Block\Block_Parser';
            
        }  
        


    }
    
endif;