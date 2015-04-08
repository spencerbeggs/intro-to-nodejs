"use strict";
var jsonFormat = require("gulp-json-format");
var eol = require("gulp-eol");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "json";
	var space = options.space ? options.space : "\t";
	var dest = options.dest ? options.dest : "./";
	return gulp.task(name, function() {
		gulp.src(options.src)
			.pipe(jsonFormat(space))
			.pipe(eol())
			.pipe(gulp.dest(dest));
	});
};
