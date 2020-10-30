<?php

/**
  * Custom Gutenberg functions
  */

function havenhomes_gutenberg_default_colors() {
    add_theme_support('editor-color-palette',
    array(
        array(
            'name' => 'Ocean',
            'slug' => 'ocean',
            'color' => '#072f3b'
        ),
        array(
            'name' => 'Turquoise',
            'slug' => 'turquoise',
            'color' => '#20797f'
        ),
        array(
            'name' => 'Sky Blue',
            'slug' => 'sky-blue',
            'color' => '#8eb6b5'
        ),
        array(
            'name' => 'Mustard',
            'slug' => 'mustard',
            'color' => '#bf811a'
        ),
        array(
            'name' => 'Black',
            'slug' => 'black',
            'color' => '#000000'
        ),
        array(
            'name' => 'Coal',
            'slug' => 'coal',
            'color' => '#333333'
        ),
        array(
            'name' => 'Nickel',
            'slug' => 'nickel',
            'color' => '#666666'
        ),
        array(
            'name' => 'Moon',
            'slug' => 'moon',
            'color' => '#999999'
        ),
        array(
            'name' => 'silver',
            'slug' => 'silver',
            'color' => '#cccccc'
        ),
        array(
            'name' => 'Snow',
            'slug' => 'snow',
            'color' => '#f4f4f4'
        )
    ));
}

add_action('init', 'havenhomes_gutenberg_default_colors');

function havenhomes_gutenberg_blocks() {
    wp_register_script( 'hero', get_template_directory_uri() . '/build/index.js', array( 'wp-blocks', 'wp-block-editor', 'wp-components' ));

    register_block_type( 'havenhomes/hero', array(
        'editor_script' => 'hero',
    ));

    wp_register_script( 'icon', get_template_directory_uri() . '/build/index.js', array( 'wp-blocks', 'wp-block-editor', 'wp-components' ));

    register_block_type( 'havenhomes/icon', array(
        'editor_script' => 'icon',
    ));

    wp_register_script( 'contact-form', get_template_directory_uri() . '/build/index.js', array( 'wp-blocks', 'wp-block-editor', 'wp-components' ));

    register_block_type( 'havenhomes/contact-form', array(
        'editor_script' => 'contact-form',
    ));
}

add_action('init', 'havenhomes_gutenberg_blocks');