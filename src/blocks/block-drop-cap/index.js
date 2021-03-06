/**
 * BLOCK: Atomic Blocks Drop Cap
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import DropCap from './components/dropcap';
import icons from './components/icons';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block controls
const { 
	registerBlockType,
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
} = wp.blocks;

// Register components
const {
	Button,
	SelectControl,
} = wp.components;

class ABDropCapBlock extends Component {
	
	render() {

		// Setup the attributes
		const { attributes: { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the alignment toolbar on focus
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ dropCapAlignment }
						onChange={ ( value ) => this.props.setAttributes( { dropCapAlignment: value } ) }
					/>
				</BlockControls>
			),
			// Show the block controls on focus
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Show the block markup in the editor
			<DropCap { ...this.props }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Add paragraph text...' ) }
					value={ dropCapContent }
					isSelected={ isSelected }
					keepPlaceholderOnFocus
					formattingControls={ [ 'bold', 'italic', 'strikethrough', 'link' ] }
					className={ classnames(
						'ab-drop-cap-text',
					) }
					onChange={ ( value ) => this.props.setAttributes( { dropCapContent: value } ) }
				/>
			</DropCap>
		];
	}
}

// Register the block
registerBlockType( 'atomic-blocks/ab-drop-cap', {
	title: __( 'AB Drop Cap' ),
	description: __( 'Add a styled drop cap to the beginning of your paragraph.' ),
	icon: 'format-quote',
	category: 'common',
	keywords: [
		__( 'drop cap' ),
		__( 'quote' ),
		__( 'atomic' ),
	],
	attributes: {
		dropCapContent: {
			type: 'array',
			selector: '.ab-drop-cap-text',
			source: 'children',
		},
		dropCapAlignment: {
			type: 'string',
		},
		dropCapBackgroundColor: {
			type: 'string',
			default: '#f2f2f2'
		},
		dropCapTextColor: {
			type: 'string',
			default: '#32373c'
		},
		dropCapFontSize: {
			type: 'number',
			default: 3,
		},
		dropCapStyle: {
            type: 'string',
            default: 'drop-cap-letter',
        },
	},

	// Render the block components
	edit: ABDropCapBlock,

	// Save the attributes and markup
	save: function( props ) {

		const { dropCapContent, dropCapAlignment, dropCapBackgroundColor, dropCapTextColor, dropCapFontSize, dropCapStyle } = props.attributes;

		// Save the block markup for the front end
		return (
			<DropCap { ...props }>
				{	// Check if there is text and output
					dropCapContent && (
					<div
					className={ classnames(
						'ab-drop-cap-text'
					) }
					>
						{ dropCapContent }
					</div>
				) }	
			</DropCap>
		);
	},
} );