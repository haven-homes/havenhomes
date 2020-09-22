// Gulp.js configuration
'use strict';

const

  // source and build folders
  dir = {
    src         : './',
    build       : './'
  },

  // Gulp and plugins
  gulp          = require('gulp'),
  gutil         = require('gulp-util'),
  newer         = require('gulp-newer'),
  imagemin      = require('gulp-imagemin'),
  sass          = require('gulp-sass'),
  postcss       = require('gulp-postcss'),
  deporder      = require('gulp-deporder'),
  concat        = require('gulp-concat'),
  stripdebug    = require('gulp-strip-debug'),
  uglify        = require('gulp-uglify')
;

// Browser-sync
var browsersync = false;


// PHP settings
const php = {
  src           : dir.src + 'templates/**/*.php',
  build         : dir.build
};

// copy PHP files
gulp.task('php', () => {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});

// image settings
const images = {
  src         : dir.src + 'assets/images/**/*',
  build       : dir.build + 'assets/images/'
};

// image processing
gulp.task('images', () => {
  return gulp.src(images.src)
    .pipe(newer(images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(images.build));
});

// CSS settings
var css = {
  src         : dir.src + 'assets/styles/style.scss',
  watch       : dir.src + 'assets/styles/**/*',
  build       : dir.build,
  sassOpts: {
    outputStyle     : 'nested',
    imagePath       : images.build,
    precision       : 3,
    errLogToConsole : true
  },
  processors: [
    require('postcss-assets')({
      loadPaths: ['assets/images/'],
      basePath: dir.build,
      baseUrl: './'
    }),
    require('css-mqpacker'),
    require('cssnano')
  ]
};

// CSS processing
gulp.task('css', () => {
  return gulp.src(css.src)
    .pipe(sass(css.sassOpts))
    .pipe(postcss(css.processors))
    .pipe(gulp.dest(css.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
});

// JavaScript settings
const js = {
  src         : dir.src + 'assets/scripts/**/*',
  build       : dir.build + 'assets/scripts/',
  filename    : 'scripts.js'
};

// JavaScript processing
gulp.task('js', () => {

  return gulp.src(js.src)
    .pipe(deporder())
    .pipe(concat(js.filename))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(js.build));
//    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());

});

// Build all
gulp.task('build', gulp.parallel('php', 'images', 'css', 'js'));

// Browsersync options
//const syncOpts = {
//  proxy       : 'localhost',
//  files       : dir.build + '**/*',
//  open        : false,
//  notify      : false,
//  ghostMode   : false,
//  ui: {
//    port: 8000
//  }
//};


// browser-sync
//gulp.task('browsersync', () => {
//  if (browsersync === false) {
//    browsersync = require('browser-sync').create();
//    browsersync.init(syncOpts);
//  }
//});

// watch for file changes
gulp.task('watch', () => {

  // page changes
  gulp.watch(php.src, gulp.parallel('php'));

  // image changes
  gulp.watch(images.src, gulp.parallel('images'));

    // CSS changes
  gulp.watch(css.watch, gulp.parallel('css'));

  // JavaScript main changes
  gulp.watch(js.src, gulp.parallel('js'));

});

// default task
gulp.task('default', gulp.parallel('build', 'watch'));