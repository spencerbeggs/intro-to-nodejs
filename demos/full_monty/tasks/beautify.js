"use strict";
var beautify = require("gulp-jsbeautifier");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "beautify";
	var settings = {};
	if (options.config) {
		settings.config = options.config;
	}
	var dest = options.dest ? options.dest : "./";
	return gulp.task(name, function() {
		return gulp.src(options.src)
			.pipe(beautify(settings))
			.pipe(gulp.dest(dest));
	});
};
