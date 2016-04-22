var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// Set up Browsersync to serve site.
gulp.task('browserSync', function() {
    browserSync.init({
        notify: false,
        server: {
          baseDir: './'
        }
    });
});

// Autoprefix CSS.
gulp.task('css', function() {
  return gulp.src('public/src/stylesheets/**/*.css')
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/dist/stylesheets'));
});

// Reload when files change.
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(['index.html', 'app/views/**/*.html'], browserSync.reload);
    gulp.watch(['app/**/*.js'], browserSync.reload);
    gulp.watch('css/*.css', ['css', browserSync.reload]);
});
