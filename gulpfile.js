/*jshint nonew: false */
"use strict";
var gulp = require("gulp");
var tasks = require("./lib/tasks");
var fs = require("fs");
var config = require("./lib/config");
var pjson = require("./package.json");
var taskListing = require("gulp-task-listing");

var suffix = config.env === "prod" ? ".min" : "";

tasks.nodemon({
	watch: [
		"lib/**/*.js",
		"lib/templates/**/*.hbs"
	],
	ignore: [
		"lib/app/**/*.js",
		"lib/public/**/*.js",
		"lib/tasks/**/*.js",
		"lib/node_modules/**",
		"lib/bower_components/**"
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

tasks.jshint({
	src: ["./lib/app/**/*.js"]
});

tasks.browserSync({
	src: ["lib/public/css/**/*.css", "./lib/public/js/**/*.js"]
});

tasks.zone({
	name: "backbone",
	js: "./lib/app/backbone.js",
	css: "./lib/less/backbone.less"
});

tasks.zone({
	name: "react",
	js: "./lib/app/react.js",
	css: "./lib/less/react.less"
});

gulp.task("help", taskListing);

//gulp.task("dev", gulp.series(gulp.parallel(["react", "backbone"]), "nodemon", "browser-sync"));

//gulp.task("build", gulp.parallel("react-build", "backbone-build"));

//gulp.task("build", gulp.series(["build-css", "build-js", "react-js-build", "react-css-build"]));