<?php

/* 
 * Gravity Forms Controller
 */

namespace Tilnet\Rest_Api;

if (!class_exists('\Tilnet\Rest_Api\Gform_Controller')) :
    
    require_once WP_PLUGIN_DIR . '/gravityforms/includes/webapi/v2/includes/controllers/class-gf-rest-controller.php';
    require_once WP_PLUGIN_DIR . '/gravityforms/includes/webapi/v2/includes/controllers/class-controller-forms.php';
    
    class Gform_Controller extends \GF_REST_Forms_Controller {
        
        /**
         *
         * @var type 
         */
	protected $namespace = 'til/v1';

        /**
         * 
         */
	public function register_routes() {

            $namespace = $this->namespace;

            $base = $this->rest_base;

            register_rest_route( $namespace, '/' . $base . '/(?P<id>[\d]+)', array(
                array(
                    'methods'         => \WP_REST_Server::READABLE,
                    'callback'        => array( $this, 'get_item' ),
                    'permission_callback' => array( $this, 'get_item_permissions_check' ),
                    'args'            => array(
                        'context'          => array(
                            'default'      => 'view',
                        ),
                    ),
                ),
                array(
                    'methods'         => 'PUT',
                    'callback'        => array( $this, 'update_item' ),
                    'permission_callback' => array( $this, 'update_item_permissions_check' ),
                    'args'            => $this->get_endpoint_args_for_item_schema( false ),
                ),

            ) );


	}
        
        /**
         * 
         * @param type $request
         * @return boolean
         */
	public function get_item_permissions_check( $request ) 
        {
            return true;
        }
        
    }
    
    
endif;

