<?php

/* 
 * Extend Wp_Block_Parser
 */

namespace Tilnet\Block;

class Block_Parser extends \WP_Block_Parser
{   
    

    /**
     * 
     * @return type
     */
    function next_token() 
    {

        $results    =   parent::next_token();

        return $this->til_next_token($results);

    }
    
    /**
     * 
     * @param type $results
     * @return type
     */
    function til_next_token($results) 
    {

        list ($tag ,$name, $attrs, $started_at, $length) = $results;

        $ref            =   $attrs['ref'] ?? false;

        if ( $ref) {
        
            $results[2]         =   self::ref_block_attrs($ref,$attrs);
        }
        
        return $results;

    } 
    
    /**
     * 
     * @param type $ref
     * @param type $attrs
     * @return type
     */
    public static function ref_block_attrs ($ref,$attrs = [])
    {
        $post           =   get_post($ref);
        $blocks         =   parse_blocks($post->post_content);

        if (empty($blocks)) {
            return $attrs;
        }

        if (isset($blocks[0]['attrs'])) {
            $attrs = array_merge($blocks[0]['attrs'],$attrs);
            $attrs['refName'] = $blocks[0]['blockName'];
            if (! empty($blocks[0]['innerBlocks'])) {
                $attrs['refBlocks'] = $blocks[0]['innerBlocks'];
            }
        }
        
        return $attrs;
        
   
    }
    

}

