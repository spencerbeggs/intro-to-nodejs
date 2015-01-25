"use strict";
var browserify = require("browserify");
var watchify = require("watchify");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var gutil = require("gulp-util");
var prettyHrtime = require("pretty-hrtime");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var pjson = require("../package.json");

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "browserify";
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
	if (!options.src) {
		throw new Error("You must specify an entry module.");
	}
	if (!options.dest) {
		throw new Error("You must specify an output.");
	}
	gulp.task(name, function() {

		function handleErrors() {
			var args = Array.prototype.slice.call(arguments);

			// Send error to notification center with gulp-notify
			notify.onError({
				title: "Compile Error",
				message: "<%= error.message %>"
			}).apply(this, args);

			// Keep gulp from hanging on this task
			this.emit("end");
		}
		var startTime;

		var logger = {
			start: function(filepath) {
				startTime = process.hrtime();
				// gutil.log("Bundling", gutil.colors.green(filepath) + "...");
			},

			end: function(filepath) {
				var taskTime = process.hrtime(startTime);
				var prettyTime = prettyHrtime(taskTime);
				gutil.log("Bundled", gutil.colors.green(filepath), "in", gutil.colors.magenta(prettyTime));
			}
		};

		function rebundle() {
			logger.start(output);
			var stream = bundler.bundle();
			return stream
				.on("error", handleErrors)
				.pipe(source(output))
				.pipe(gulp.dest(outputPath))
				.on("end", function() {
					// Log when bundling completes
					logger.end(output);
					browserSync.reload({
						stream: true
					});
				});
		}

		var bundler = browserify(options.src, {
			cache: {},
			packageCache: {},
			fullPaths: true,
			debug: true
		});
		watchify(bundler);
		bundler.on("update", rebundle);
		return rebundle();
	});
};
