"use strict";
var gulp = require("gulp");
var config = require("../config");

module.exports.beautify = require("./beautify");
module.exports.browserify = require("./browserify");
module.exports.browserSync = require("./browser_sync");
module.exports.buildCss = require("./build_css");
module.exports.buildJs = require("./build_js");
module.exports.jshint = require("./jshint");
module.exports.json = require("./json");
module.exports.less = require("./less");
module.exports.nodemon = require("./nodemon");
module.exports.watch = require("./watch");
module.exports.zone = function(options) {
	var suffix = config.env === "prod" ? ".min" : "";

	module.exports.browserify({
		name: options.name + "-js",
		src: "./lib/app/" + options.name + ".js",
		dest: "./lib/public/js/" + options.name + ".js"
	});

	module.exports.less({
		name: options.name + "-less",
		src: options.css,
		dest: "lib/public/css/" + options.name + ".css"
	});

	module.exports.watch({
		name: "watch-" + options.name + "-css",
		src: [options.css],
		middleware: [options.name + "-less"]
	});

	module.exports.buildJs({
		name: options.name + "-js-build",
		src: options.js,
		dest: "./lib/public/js/" + options.name + suffix + ".js"
	});

	module.exports.buildCss({
		name: options.name + "-css-build",
		src: options.css,
		dest: "./lib/public/js/" + options.name + suffix + ".js",
	});
	return (function() {
		gulp.task(options.name, gulp.series([options.name + "-js", options.name + "-less"]), gulp.parallel([options.name + "-js", "watch-" + options.name + "-css"]));
		gulp.task(options.name + "-build", gulp.parallel([options.name + "-js-build", options.name + "-css-build"]));
	})();
};