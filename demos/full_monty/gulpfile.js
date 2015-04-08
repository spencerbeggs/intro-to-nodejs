/*jshint nonew: false */
"use strict";
var gulp = require("gulp");
var nib = require("nib");
var stylus = require("gulp-stylus");
var maps = require("gulp-sourcemaps");
var please = require("gulp-pleeease");
var tasks = require("./tasks");
var runSequence = require("run-sequence");
var fs = require("fs");

tasks.nodemon({
	watch: [
		"**/*.js",
		"templates/**/*.hbs"
	],
	ignore: [
		"app/**/*.js",
		"public/**/*.js",
		"tasks/**/*.js",
		"node_modules/**",
		"bower_components/**"
	]
});

gulp.task("beautify-less", function() {
	var settings = JSON.parse(fs.readFileSync("./.jsbeautifyrc", "utf8"));
	tasks.beautify({
		src: ["./less/**/*.less"],
		dest: "./less",
		config: settings.css,
		name: "beautify-less"
	});
});

gulp.task("setup", function() {
	tasks.jshint({
		src: ["./app/**/*.js"]
	});
	tasks.less({
		name: "less",
		src: "./less/desktop.less",
		dest: "public/css/desktop.css"
	});
	tasks.watch({
		name: "watch-less",
		src: ["./less/**/*.less"],
		middleware: ["less"]
	});
	tasks.browserify({
		name: "browserify",
		src: "./app/desktop.js",
		dest: "./public/js/desktop.js"
	});
	tasks.watch({
		name: "watch-js",
		src: ["./app5/**/*.js"]
	});
	runSequence("jshint", ["less", "browserify"], ["watch-less", "watch-js"]);
});

gulp.task("build", function() {
	tasks.buildCss({
		name: "build-css",
		src: "./less/desktop.less",
		dest: "./public/css/desktop.min.css"
	});
	tasks.buildJs({
		name: "build-js",
		src: "./app/desktop.js",
		dest: "./public/js/desktop.min.js"
	});
	runSequence("build-css", "build-js");
});

gulp.task("dev", function() {
	tasks.browserSync({
		src: "./public/css/**/*.css"
	});
	runSequence("setup", "nodemon");
});

gulp.task("develop", function() {
	runSequence("dev", "nodemon");
});

gulp.task("predeploy", function() {
	runSequence("build");
});
