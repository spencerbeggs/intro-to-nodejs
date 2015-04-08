"use strict";
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var stripDebug = require("gulp-strip-debug");
var pjson = require("../package.json");
var plumber = require("gulp-plumber");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "build-js";
	var space = options.space ? options.space : "\t";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output, outputPath;
	if (arr[arr.length - 1] !== "") {
		var outputArr = arr[arr.length - 1].split(".");
		outputArr[0] = outputArr[0] + "-" + pjson.version;
		output = outputArr.join(".");
	}
	else {
		output = dest;
	}
	if (arr.length > 1) {
		arr.pop();
		outputPath = arr.join("/");
	}
	else {
		outputPath = "./";
	}
	return gulp.task(name, function() {
		var bundler = browserify(options.src);
		var stream = bundler.bundle();
		return stream
			.pipe(plumber())
			.pipe(source(output))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(stripDebug())
			.pipe(gulp.dest(outputPath));

	});
};
