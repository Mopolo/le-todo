var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require("gulp-babel");

var jsPath = 'src/**/*.js';

gulp.task('default', ['watch']);

gulp.task('build', ['js']);

gulp.task('js', function() {
    return gulp.src(jsPath)
        .pipe(babel())
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});

gulp.task('watch', ['js'], function() {
    gulp.watch(jsPath, ['js']);
});
