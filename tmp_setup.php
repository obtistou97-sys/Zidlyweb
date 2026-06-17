<?php
// ZidWeb Studio - WordPress Setup Script
// Run via: wp eval-file tmp_setup.php

// 1. Set Elementor data for header (post 19)
$header_data = [
  'content' => [
    [
      'id' => 'hdr-cont',
      'elType' => 'container',
      'settings' => [
        'flex_direction' => 'row',
        'justify_content' => 'space-between',
        'align_items' => 'center',
        'padding' => ['unit' => 'px', 'top' => 15, 'right' => 30, 'bottom' => 15, 'left' => 30],
        'background_background' => 'classic',
        'background_color' => '#FFFFFF',
        'content_width' => 'full',
        'width' => ['unit' => '%', 'size' => 100],
      ],
      'elements' => [
        [
          'id' => 'hdr-logo',
          'elType' => 'widget',
          'widgetType' => 'image',
          'settings' => [
            'image' => ['url' => '', 'id' => ''],
            'width' => ['unit' => 'px', 'size' => 130],
          ],
        ],
        [
          'id' => 'hdr-nav',
          'elType' => 'widget',
          'widgetType' => 'nav-menu',
          'settings' => [
            'menu' => 2,
            'layout' => 'horizontal',
            'gap' => ['unit' => 'px', 'size' => 25],
          ],
        ],
        [
          'id' => 'hdr-cta',
          'elType' => 'widget',
          'widgetType' => 'button',
          'settings' => [
            'text' => "Let's Talk",
            'link' => ['url' => '/contact'],
            'button_background_color' => '#2563EB',
            'button_text_color' => '#FFFFFF',
            'border_radius' => ['unit' => 'px', 'top' => 50, 'right' => 50, 'bottom' => 50, 'left' => 50],
            'padding' => ['unit' => 'px', 'top' => 12, 'right' => 24, 'bottom' => 12, 'left' => 24],
          ],
        ],
      ],
    ],
  ],
];

update_post_meta(19, '_elementor_data', wp_slash(wp_json_encode($header_data)));
update_post_meta(19, '_elementor_edit_mode', 'builder');
update_post_meta(19, '_elementor_template_type', 'xpro-themer');
update_post_meta(19, '_elementor_version', '3.27.0');
echo "Header data set for post 19\n";

// 2. Get the footer post ID (most recently created elementor_library)
$footer_posts = get_posts([
  'post_type' => 'elementor_library',
  'post_status' => 'publish',
  'posts_per_page' => 1,
  'orderby' => 'date',
  'order' => 'DESC',
]);
if (!empty($footer_posts)) {
  $footer_id = $footer_posts[0]->ID;
  echo "Footer post ID: $footer_id\n";
  
  $footer_data = [
    'content' => [
      [
        'id' => 'ftr-cont',
        'elType' => 'container',
        'settings' => [
          'flex_direction' => 'row',
          'justify_content' => 'space-between',
          'align_items' => 'center',
          'padding' => ['unit' => 'px', 'top' => 20, 'right' => 30, 'bottom' => 20, 'left' => 30],
          'background_background' => 'classic',
          'background_color' => '#0B1220',
          'content_width' => 'full',
        ],
        'elements' => [
          [
            'id' => 'ftr-text',
            'elType' => 'widget',
            'widgetType' => 'text-editor',
            'settings' => [
              'text_color' => '#94A3B8',
              'editor' => '<p>© ' . date('Y') . ' ZidWeb Studio. All rights reserved.</p>',
            ],
          ],
        ],
      ],
    ],
  ];
  
  update_post_meta($footer_id, '_elementor_data', wp_slash(wp_json_encode($footer_data)));
  update_post_meta($footer_id, '_elementor_edit_mode', 'builder');
  update_post_meta($footer_id, '_elementor_template_type', 'xpro-themer');
  update_post_meta($footer_id, '_elementor_version', '3.27.0');
  echo "Footer data set for post $footer_id\n";
}

// 3. Set XPRO theme conditions (display header/footer on entire site)
// XPRO stores conditions in xpro_theme_conditions post meta
// Format: [{"type":"include","condition":"entire_site"}]
$conditions = wp_json_encode([['type' => 'include', 'condition' => 'entire_site']]);
update_post_meta(19, 'xpro_theme_conditions', wp_slash($conditions));
if (!empty($footer_posts)) {
  update_post_meta($footer_posts[0]->ID, 'xpro_theme_conditions', wp_slash($conditions));
}

echo "XPRO conditions set\n";

// 4. Mark header/footer in XPRO options
update_option('xpro_theme_header_template_id', 19);
if (!empty($footer_posts)) {
  update_option('xpro_theme_footer_template_id', $footer_posts[0]->ID);
}

echo "XPRO options saved\n";
echo "Done!\n";
