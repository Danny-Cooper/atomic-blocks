/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
} = wp.blocks;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	PanelColor,
	FormToggle,
	RangeControl, 
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Notice dismiss options
		const noticeDismissOptions = [
			{ value: '', label: __( 'Always Show' ) },
			{ value: 'ab-dismissable', label: __( 'Dismissable' ) },
		];

		// Setup the attributes
		const { attributes: { noticeTitle, noticeContent, noticeAlignment, noticeBackgroundColor, noticeTextColor, noticeTitleColor, noticeFontSize, noticeDismiss } } = this.props;

		return (
		<InspectorControls key="inspector">

			<RangeControl
				label={ __( 'Font Size' ) }
				value={ noticeFontSize }
				onChange={ ( value ) => this.props.setAttributes( { noticeFontSize: value } ) }
				min={ 14 }
				max={ 24 }
				step={ 1 }
			/>

			<SelectControl
				label={ __( 'Notice Display' ) }
				description={ __( 'Do you want the message to always show or dismissable?' ) }
				options={ noticeDismissOptions }
				value={ noticeDismiss }
				onChange={ ( value ) => this.props.setAttributes( { noticeDismiss: value } ) }
			/>
			
			<PanelColor 
				title={ __( 'Notice Color' ) }
				colorValue={ noticeBackgroundColor }
				initialOpen={ false }
			>
				<ColorPalette
					label={ __( 'Notice Color' ) }
					value={ noticeBackgroundColor }
					onChange={ ( value ) => this.props.setAttributes( { noticeBackgroundColor: value } ) }
					colors={['#00d1b2', '#3373dc', '#209cef', '#22d25f', '#ffdd57', '#ff3860', '#7941b6', '#392F43']}
				/>
			</PanelColor>

			<PanelColor 
				title={ __( 'Title Color' ) }
				colorValue={ noticeTitleColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Title Color' ) }
					value={ noticeTitleColor }
					onChange={ ( value ) => this.props.setAttributes( { noticeTitleColor: value } ) }
					colors={['#fff', '#32373c' ]}
				/>
			</PanelColor>
			
			<PanelColor 
				title={ __( 'Text Color' ) }
				colorValue={ noticeTextColor }
				initialOpen={ false }
			>
				<ColorPalette 
					label={ __( 'Background Color' ) }
					value={ noticeTextColor }
					onChange={ ( value ) => this.props.setAttributes( { noticeTextColor: value } ) }
					colors={['#32373c', '#fff' ]}
				/>
			</PanelColor>

		</InspectorControls>
		);
	}
}
