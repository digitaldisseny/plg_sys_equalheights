var gulp = require('gulp');

var extension = require('./package.json');

var requireDir = require('require-dir');
var zip        = require('gulp-zip');
var config    = require('./gulp-config.json');

var jgulp = requireDir('./node_modules/joomla-gulp', {recurse: true});
var dir = requireDir('./joomla-gulp-extensions', {recurse: true});

var rootFolder = '..';

// Override of the release script
gulp.task('release', function () {
	return gulp.src([
			rootFolder + '/**/*',
			'!' + rootFolder + '/git/**',
			'!' + rootFolder + '/git',
			'!' + rootFolder + '/**/bower.json',
			'!' + rootFolder + '/**/scss/**',
			'!' + rootFolder + '/build/**',
			'!' + rootFolder + '/build',
			'!' + rootFolder + '/docs/**',
			'!' + rootFolder + '/docs',
			'!' + rootFolder + '/tests/**',
			'!' + rootFolder + '/tests',
			'!' + rootFolder + '/*.sublime-*',
			'!' + rootFolder + '/composer.json'
		])
		.pipe(zip(extension.name + '-' + extension.version + '.zip'))
		.pipe(gulp.dest('releases'));
});
