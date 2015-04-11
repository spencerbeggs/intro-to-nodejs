"use strict";
var browserSync = require("browser-sync");
var config = require("../config");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "browser-sync";
	return gulp.task(name, function() {
		browserSync({
			files: options.src,
			open: false,
			host: config.host,
			port: 5000,
			browser: ["google chrome"],
			ui: {
				port: 7979
			}

		});
	});
};
