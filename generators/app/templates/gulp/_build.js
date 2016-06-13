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

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.using())
    .pipe($.useref({newLine:'New file'}))
    .pipe($.using({prefix:'useref'}))

    .pipe($.if('*.js', $.using({prefix:'if *.js'})))
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.js', $.sourcemaps.init()))
    .pipe($.if('*.js', $.uglify({ preserveComments: $.uglifySaveLicense }).on('error', conf.errorHandler('Uglify'))))
    .pipe($.if('*.js', $.sourcemaps.write('maps')))

    .pipe($.if('*.css', $.using({prefix:'if *.css'})))
    .pipe($.if('*.css', $.rev()))
    .pipe($.if('*.css', $.sourcemaps.init()))
    <% if (useBootstrap) { %>.pipe($.if('*.css', $.replace('../../bower_components/bootstrap/fonts/', '../assets/fonts/')))<% } %>
    .pipe($.if('*.css', $.replace('../fonts/', '../assets/fonts/')))
    .pipe($.if('*.css', $.minifyCss({ processImport: false })))
    .pipe($.if('*.css', $.sourcemaps.write('maps')))

    .pipe($.if('*.html',  $.using({prefix:'if html'})))
    .pipe($.if('*.html',  $.minifyHtml({
                                  empty: true,
                                  spare: true,
                                  quotes: true,
                                  conditionals: true
                                })))
        // ))
    .pipe($.revReplace())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    // .pipe($.using({prefix:'Moving to dist'}))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.using())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/assets/fonts/')));
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
    .pipe($.using())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/*'), path.join(conf.paths.tmp, '/*')]);
});

gulp.task('clean:tmp', function() {
    return $.del([path.join(conf.paths.dist, '/*'), path.join(conf.paths.tmp, '/*')]);
});

gulp.task('build', ['code-check', 'html', 'fonts', 'other']);
