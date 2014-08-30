var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
	
	
gulp.task('styles', function() {
	return gulp.src(['storage/css/**/*.css', '!storage/css/jquery/ui/themes/start/jquery-ui-1.10.3.custom.css'])
	.pipe(concat('styles.css'))
    .pipe(gulp.dest('storage/cache'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('storage/cache'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
	return gulp.src([
		"storage/js/libs/jquery-ui-datepicker-*.js",
		"storage/js/myWallet.js",
		"storage/js/translations/*",
		"storage/js/errors.js",
		"storage/js/main.js",
		"storage/js/models/*",
		"storage/js/collections/*",
		"storage/js/templates/*",
		"storage/js/views/main.js",
		"storage/js/views/login.js",
		"storage/js/views/about.js",
		"storage/js/views/register.js",
		"storage/js/views/forgotPassword.js",
		"storage/js/views/spendings.js",
		"storage/js/views/profile.js",
		"storage/js/views/formAddSpending.js",
		"storage/js/views/reports.js",
		"storage/js/views/reportGroupBySpengingName.js",
		"storage/js/views/reportAmountByPeriod.js"
	])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('storage/cache'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('storage/cache'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['storage/cache/*'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {

  // Watch .css files
  gulp.watch('storage/css/**/*.css', ['styles']);

  // Watch .js files
  gulp.watch('storage/js/**/*.js', ['scripts']);

});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
