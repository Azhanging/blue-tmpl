'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	header = require('gulp-header'),
	uglify = require('gulp-uglify');

var src = {
	js: ['src/js/*.js'],
	jsConcat: ['dist/js/*.js'],
	dist: 'dist',
	del: 'dist',
	watch: {
		js: {
			path: [
				'src/js/*.js'
			],
			task: 'concat'
		}
	}
}

gulp.task('concat', function() {
	//压缩_require
	return gulp.src(src.js, {
			base: 'src'
		})
		.pipe(uglify())
		.pipe(header([
		    '/**',
		    '*',
		    '*',
		    '* tmpl.js v1.0.1',
		    '* (c) 2016-2017 Blue',
		    '* Released under the MIT License.',
		    '*',
		    '*',
		    '**/', ''
		].join('\n')))
		.pipe(gulp.dest(src.dist))
		.on('error', function(err) {
            console.error('Error in compress task', err.toString());
        });
});

//watch fn
var watch = function(type) {
	gulp.watch(src.watch[type].path, function(ev) {
		gulp.start(src.watch[type].task);
		console.log("修改路径:" + ev.path + ',修改类型:' + ev.type);
	});
}

//watch
gulp.task('watch', function() {
	watch('js');
});

//default
gulp.task('default', ['watch', 'concat']);