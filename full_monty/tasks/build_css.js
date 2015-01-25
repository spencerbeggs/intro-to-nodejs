"use strict";
var less = require("gulp-less");
var concat = require("gulp-concat");
var prefixer = require("less-plugin-autoprefix");
var minifyCSS = require("gulp-minify-css");
var autoprefixer = new prefixer({
	browsers: ["last 3 versions"]
});
var pjson = require("../package.json");
var plumber = require("gulp-plumber");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "build-css";
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
		return gulp.src(options.src)
			.pipe(plumber())
			.pipe(less({
				plugins: [autoprefixer]
			}))
			.pipe(minifyCSS({
				keepSpecialComments: 0
			}))
			.pipe(concat(output))
			.pipe(gulp.dest(outputPath));
	});
};
