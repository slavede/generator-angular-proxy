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
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});
