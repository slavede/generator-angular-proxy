'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject:watch'], function() {
  browserSync.reload();
});

// tales all .html files from application
// and puts it inside templateCacheHtml.js
// for gulp serve (development) it will place templateCacheHtml.js inside .tmp
// for dist it will join it with app.js
gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: conf.moduleName,
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/serve/partials/'));
});

// reads scripts and styles from given folders
// and .html from src folder and injects
// scripts and styles into tmp/serve/index.html

// first calls scripts/styles which copy-pastes scripts
// into server folder
// to inject them from there

// styles will build .css based on app.less (it will inject all .less inside)
// and then compile it
// after it, it will move it to serve folder
gulp.task('inject', ['scripts', 'styles', 'partials'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.js'),
    path.join('!' + conf.paths.tmp, '/serve/app/**/*.spec.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/serve/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    // ignorePath: path.join(conf.paths.tmp, '/partials'),
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

// SAME AS ABOVE BUT WITHOUT PARTIALS
// reads scripts and styles from given folders
// and .html from src folder and injects
// scripts and styles into tmp/serve/index.html

// first calls scripts/styles which copy-pastes scripts
// into server folder
// to inject them from there

// styles will build .css based on app.less (it will inject all .less inside)
// and then compile it
// after it, it will move it to serve folder
gulp.task('inject:watch', ['styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };


  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

