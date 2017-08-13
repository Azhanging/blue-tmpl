'use strict';
var version = 'v1.0.2';
var github = 'https://github.com/azhanging/tmpl';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	header = require('gulp-header'),
	uglify = require('gulp-uglify'),
	path = require('path');

var src = {
	js: [
	   'src/js/tmpl.js',
	   'src/js/tmpl-router.js'
	],
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
		.pipe(uglify().on('error', function(e) {
			console.log(e);
		}))
		.pipe(header('commit'))
		.pipe(gulp.dest(src.dist));
		
		
});

//watch fn
var watch = function(type) {
	gulp.watch(src.watch[type].path, function(ev) {
		gulp.start(src.watch[type].task);
		console.log("修改路径:" + ev.path + ',修改类型:' + ev.type + ' time：' + new Date());
	});
}

//watch
gulp.task('watch', function() {
	watch('js');
});

//default
gulp.task('default', ['watch', 'concat']);