"use strict";
var gutil = require("gulp-util");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "watch";
	var middleware = options.middleware ? options.middleware : undefined;
	return gulp.task(name, function() {
		var files = gulp.watch(options.src, middleware);
		files.on("change", function(event) {
			gutil.log("File " + gutil.colors.yellow(event.path) + " was " + event.type);
		});
	});
};
