'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// goes through index.html
// with userref takes build blocks and minifies stuff
// it moves everything at the end into dist folder

// 1. userref will concatenate everything into target .css/.js based on files inside the anotations (inject will put them there) inside index.html
// 2. file which it created (e.g. app.js), it will assign revision ($.rev())
// 3. it will do additional task on it (uglify, minifyHtml, minifyCss)
// 4. revReplace will go again into index.html and apply new revision
// 5. everything will be moved into dist folder then
gulp.task('html', ['inject'], function () {

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter(['**/*.js', conf.paths.tmp + '/serve/partials/templateCacheHtml.js'], { restore: true });
  // var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
  	.pipe($.using())
    .pipe(assets = $.useref.assets())
    .pipe($.using({prefix:'Using assets'}))
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.using({prefix:'Using files with jsFilter'}))
    .pipe($.sourcemaps.init())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.using({prefix:'Using files with cssFilter'}))
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.using({prefix:'Using files with htmlFilter'}))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    // .pipe($.using({prefix:'Moving to dist'}))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,less}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/*'), path.join(conf.paths.tmp, '/*')]);
});

gulp.task('build', ['html', 'fonts', 'other']);
