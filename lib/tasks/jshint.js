"use strict";
var jshint = require("gulp-jshint");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "jshint";
	var reporter = options.reporter ? options.reporter : "default";
	return gulp.task(name, function(callback) {
		gulp.src(options.src)
			.pipe(jshint())
			.pipe(jshint.reporter("default"));
		callback();
	});
};
