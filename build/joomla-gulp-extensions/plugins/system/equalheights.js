var gulp = require('gulp');

// Load config
var config = require('../../../gulp-config.json');

// Dependencies
var browserSync = require('browser-sync');
var del         = require('del');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');

var group = 'system';
var name  = 'equalheights';

var baseTask  = 'plugins.' + group + '.' + name;
var extPath   = '..';
var mediaPath = extPath + '/media/plg_system_equalheights';

var wwwExtPath = config.wwwDir + '/plugins/' + group + '/' + name;
var wwwMediaPath = config.wwwDir + '/media/plg_' + group + '_' + name;

// Clean
gulp.task('clean:' + baseTask,
	[
		'clean:' + baseTask + ':plugin',
		'clean:' + baseTask + ':media'
	],
	function() {
});

// Clean: plugin
gulp.task('clean:' + baseTask + ':plugin', function() {
	return del(wwwExtPath, {force : true});
});

// Clean: media
gulp.task('clean:' + baseTask + ':media', function() {
	return del(wwwMediaPath, {force: true});
});

// Copy
gulp.task('copy:' + baseTask,
	[
		'copy:' + baseTask + ':plugin',
		'copy:' + baseTask + ':media'
	],
	function() {
});

// Copy: plugin
gulp.task('copy:' + baseTask + ':plugin', ['clean:' + baseTask + ':plugin'], function() {
	return gulp.src([
			extPath + '/**',
			'!' + extPath + '/build/**',
			'!' + extPath + '/build',
			'!' + extPath + '/media/**',
			'!' + extPath + '/media',
			'!' + extPath + '/.gitignore',
			'!' + extPath + '/*.sublime-*',
		])
		.pipe(gulp.dest(wwwExtPath));
});

// Copy: media
gulp.task('copy:' + baseTask + ':media', ['clean:' + baseTask + ':media'], function() {
    return gulp.src([
	        mediaPath + '/**'
    	])
		.pipe(gulp.dest(wwwMediaPath));
});

// Scripts
gulp.task('scripts:' + baseTask, function () {
	return gulp.src([
			mediaPath + '/js/**/*.js',
			'!' + mediaPath + '/js/**/*.min.js'
		])
		.pipe(gulp.dest(wwwMediaPath + '/js'))
		.pipe(uglify())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(mediaPath + '/js'))
		.pipe(gulp.dest(wwwMediaPath + '/js'));
});

// Watch
gulp.task('watch:' + baseTask,
	[
		'watch:' + baseTask + ':plugin',
		'watch:' + baseTask + ':scripts'
	],
	function() {
});

// Watch: plugin
gulp.task('watch:' + baseTask + ':plugin', function() {
	gulp.watch([
			extPath + '/**/*',
			'!' + extPath + '/build/**/*',
			'!' + extPath + '/media/**/*',
			'!' + extPath + '/.gitignore',
			'!' + extPath + '/*.sublime-*',
		],
		['copy:' + baseTask + ':plugin', browserSync.reload]
	);
});

// Watch: scripts
gulp.task('watch:' + baseTask + ':scripts', function() {
    gulp.watch([
    	mediaPath + '/js/*.js',
    	'!' + mediaPath + '/js/*.min.js'
    ], ['scripts:' + baseTask, browserSync.reload]);
});
