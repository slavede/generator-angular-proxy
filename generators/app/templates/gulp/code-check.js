var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
}),
    path = require('path'),
    conf = require('./conf'),
    gulp = require('gulp'),
    sources = [ path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/app/**/*.js')  ]

gulp.task('jshint', function() {
    return gulp.src(sources)
        .pipe($.using())
        .pipe($.jshint('src/.jshintrc'))
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('jscs', function() {
    return gulp.src(sources)
        .pipe($.using())
        .pipe($.jscs({configPath:'src/.jscsrc'}))
        .pipe($.jscs.reporter());
});