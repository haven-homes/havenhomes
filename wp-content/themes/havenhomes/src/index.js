const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, IconButton, RangeControl } = wp.components;
const ALLOWED_BLOCKS_HERO = ['core/button'];

// ---------------------------
// HERO BLOCK
// ---------------------------

registerBlockType('havenhomes/hero', {
    title: 'Hero',
    description: 'Hero block with image as a background and ability to add title, description, and up to 2 CTA buttons',
    icon: 'format-image',
    category: 'common',

    attributes: {
        backgroundImage: {
            type: 'string',
            default: null
        },
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2'
        },
        titleColor: {
            type: 'string',
            default: 'black'
        },
        content: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        contentColor: {
            type: 'string',
            default: 'black'
        },
        alignment: {
            type: 'string',
            default: 'none'
        },
        overlayColor: {
            type: 'string',
            default: 'white'
        },
        overlayOpacity: {
            type: 'number',
            default: 0.3
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const {
            title,
            titleColor,
            content,
            contentColor,
            alignment,
            overlayColor,
            overlayOpacity,
            backgroundImage
        } = attributes;

        function onChangeTitle(newTitle) {
            setAttributes( { title: newTitle } );
        }

        function onChangeContent(newContent) {
            setAttributes( { content: newContent } );
        }

        function onTitleColorChange(newColor) {
            setAttributes( { titleColor: newColor } );
        }

        function onSelectImage(newImage) {
            setAttributes( { backgroundImage: newImage.sizes.full.url } );
        }

        function onContentColorChange(newColor) {
            setAttributes( { contentColor: newColor } );
        }

        function onOverlayColorChange(newColor) {
            setAttributes( { overlayColor: newColor } );
        }

        function onOverlayOpacityChange(newOpacity) {
            setAttributes({ overlayOpacity: newOpacity });
        }

        function onAlignmentChange(newAlignment) {
            setAttributes( {
                alignment: newAlignment === undefined ? 'non' : newAlignment
            } );
        }

        return ([
            <InspectorControls style={ { marginBottom: '40px' } }>
                <PanelBody title={ 'Font Color Settings' }>
                    <p><strong>Select a title color:</strong></p>
                    <ColorPalette value={ titleColor }
                                  onChange={ onTitleColorChange } />

                    <p><strong>Select a content color:</strong></p>
                    <ColorPalette value={ contentColor }
                                  onChange={ onContentColorChange } />
                </PanelBody>
                <PanelBody title={ 'Background Image Settings' }>
                    <p><strong>Select a Background Image</strong></p>
                    <MediaUpload
                        onSelect={ onSelectImage }
                        type="image"
                        value={ backgroundImage }
                        render={ ( { open } ) => (
                            <IconButton
                                className="editor-media-placeholder__button is-button is-default is-large"
                                icon="upload"
                                onClick={ open }>
                                    Background Image
                            </IconButton>

                        )}/>
                    <div style={{ marginTop: '20px', marginBottom: '40px' }}>
                        <p><strong>Overlay Color:</strong></p>
                        <ColorPalette value={ overlayColor }
                                      onChange= { onOverlayColorChange } />
                    </div>
                    <RangeControl
                        label={ 'Overlay Opacity' }
                        value={ overlayOpacity }
                        onChange={ onOverlayOpacityChange }
                        min={ 0 }
                        max={ 1 }
                        step={ 0.1 }/>
                </PanelBody>
            </InspectorControls>,
            <div className="hero-block" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="hero-image-scrim" style={{background: overlayColor, opacity: overlayOpacity}}></div>
                <div className="hero-content-wrapper">
                    {
                        <BlockControls>
                            <AlignmentToolbar value={ alignment }
                                onChange= { onAlignmentChange } />
                        </BlockControls>
                    }
                    <RichText key="editable"
                              tagName="h2"
                              placeholder="Title Goes Here"
                              value={ title }
                              onChange={ onChangeTitle }
                              style={ { color: titleColor } }/>
                    <RichText key="editable"
                              tagName="p"
                              placeholder="Write your content here."
                              value={ content }
                              onChange={ onChangeContent }
                              style={{ color: contentColor }}/>
               </div>
               <div className="hero-cta-wrapper">
                    <InnerBlocks allowedBlocks= { ALLOWED_BLOCKS_HERO }
                                 orientation="horizontal" />
               </div>
            </div>
        ]);
    },

    save: ({ attributes }) => {
        const {
            title,
            content,
            titleColor,
            contentColor,
            alignment,
            overlayColor,
            overlayOpacity,
            backgroundImage
        } = attributes;

        return (
            <div className="hero-block" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="hero-image-scrim" style={{background: overlayColor, opacity: overlayOpacity}}></div>
                <div className="hero-content-wrapper">
                    <h2 style={ { color: titleColor, textAlign: alignment } }>{ title }</h2>
                    <RichText.Content tagName="p"
                                      value={ content }
                                      style={{ color: contentColor, textAlign: alignment }}/>
                </div>
                <div className="hero-cta-wrapper">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    }
});