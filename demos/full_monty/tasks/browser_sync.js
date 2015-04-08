"use strict";
var browserSync = require("browser-sync");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "browser-sync";
	return gulp.task(name, function() {
		browserSync({
			files: options.src,
			open: false,
			host: "127.0.0.1",
			port: 5000,
			browser: ["google chrome"]
		});
	});
};
