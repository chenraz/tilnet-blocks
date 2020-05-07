/**
 * External dependencies
 */
import classNames from 'classnames';
import {Fragment} from 'react';

/**
 * WordPress dependencies
 */
// import { URLPopover } from '@wordpress/block-editor';
const {
	URLPopover,
	InspectorControls
} = wp.blockEditor;
// import { useState } from '@wordpress/element';
const {useState} = wp.element;
// import {
// 	Button,
// 	IconButton,
// } from '@wordpress/components';

const {
	Button,
	IconButton,	
	PanelBody,
	TextControl,
} = wp.components;

// import { __ } from '@wordpress/i18n';
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
// import { getIconBySite } from './social-list';
import './style.scss';

const Edit = ( { attributes, setAttributes, isSelected,anchor } ) => {
	const { url, site='text',label } = attributes;
	const [ showURLPopover, setPopover ] = useState( false );
	const classes = classNames(
		'wp-social-link',
		'wp-social-link-' + site,
		{ 'wp-social-link__is-incomplete': ! url },
	);

	// Import icon.
	// const IconComponent = getIconBySite( site );

	return (
		<Fragment>
			<InspectorControls key='inspectors'>
				<PanelBody>
					<TextControl 
						label={__("Button label")}
						value={label}
						onChange={(newLabel)=>setAttributes({label:newLabel})}
					/>
				</PanelBody>
			</InspectorControls>
			<Button
				key='social-button'
				className={ classes }
				onClick={ () => setPopover( true ) }
			>
				{/* <IconComponent /> */}
				{ isSelected && showURLPopover && (
					<URLPopover
						onClose={ () => setPopover( false ) }
					>
						<form
							className="block-editor-url-popover__link-editor"
							onSubmit={ ( event ) => {
								event.preventDefault();
								setPopover( false );
							} } >
							<div className="editor-url-input block-editor-url-input">
								<input type="text"
									value={ url }
									onChange={ ( event ) => setAttributes( { url: event.target.value } ) }
									placeholder={ __( 'Enter Address' ) }
								/>
							</div>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
					</URLPopover>
				) }
				{label}
			</Button>
		</Fragment>

	);
};

export default Edit;
