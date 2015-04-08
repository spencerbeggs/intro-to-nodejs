"use strict";
var config = require("../config/index.js");
var less = require("gulp-less");
var flatten = require("gulp-flatten");
var prefixer = require("less-plugin-autoprefix");
var concat = require("gulp-concat");
var browserSync = require("browser-sync");
var gutil = require("gulp-util");
var prettyHrtime = require("pretty-hrtime");
var autoprefixer = new prefixer({
	browsers: ["last 3 versions"]
});
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var pjson = require("../package.json");

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

module.exports = function(opts) {
	var options = opts || {};
	var gulp = options.gulp ? options.gulp : require("gulp");
	var name = options.name ? options.name : "less";
	var dest = options.dest ? options.dest : "./";
	var arr = dest.split("/");
	var output, outputPath;
	if (arr[arr.length - 1] !== "") {
		var outputArr = arr[arr.length - 1].split(".");
		outputArr[0] = outputArr[0] + "-" + pjson.version;
		output = outputArr.join(".");
	} else {
		output = dest;
	}
	if (arr.length > 1) {
		arr.pop();
		outputPath = arr.join("/");
	} else {
		outputPath = "./";
	}
	return gulp.task(name, function() {
		var startTime;

		var logger = {
			start: function(filepath) {
				startTime = process.hrtime();
				//gutil.log("Bundling", gutil.colors.green(filepath) + "...");
			},

			end: function(filepath) {
				var taskTime = process.hrtime(startTime);
				var prettyTime = prettyHrtime(taskTime);
				gutil.log("Bundled", gutil.colors.green(filepath), "in", gutil.colors.magenta(prettyTime));
			},
			error: function(err) {
				gutil.log(err);
			}
		};
		logger.start(output);
		return gulp.src(options.src)
			.pipe(flatten())
			.pipe(sourcemaps.init({
				loadMaps: true
			}))
			.pipe(concat(output))
			.pipe(less({
				plugins: [autoprefixer]
			}).on("error", handleErrors))
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(outputPath))
			.on("end", function() {
				logger.end(output);
				browserSync.reload({
					stream: true
				});
			});

	});
};
