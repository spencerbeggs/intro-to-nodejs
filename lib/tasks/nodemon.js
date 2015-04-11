"use strict";
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "nodemon";
	var start = options.start ? options.start : "index.js";
	var watch = options.watch ? options.watch : start;
	var ignore = options.ignore ? options.ignore : [];
	return gulp.task(name, function(cb) {
		var called = false;
		return nodemon({
				// nodemon our expressjs server
				script: start,
				// watch core server file(s) that require server restart on change
				watch: watch,
				ignore: ignore
			})
			.on("start", function onStart() {
				// ensure start only got called once
				if (!called) {
					cb();
				}
				called = true;
			})
			.on("restart", function onRestart() {
				// reload connected browsers after a slight delay
				setTimeout(function reload() {
					browserSync.reload({
						stream: false
					});
				}, 1000);
			});
	});
};
