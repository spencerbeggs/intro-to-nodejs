"use strict";
var fs = require("fs");
var path = require("path");
var async = require("async");

module.exports = function(paths) {
	// bootstrap models
	var dirs = (paths) ? paths : [path.resolve(__dirname + "/../models")];
	var funcs = [];
	var models = [];

	function bootstrap(dir) {
		fs.readdirSync(dir).forEach(function(file) {
			if (file !== ".DS_Store" && file !== ".git" && file !== "index.js") {
				funcs.push(function(callback) {
					var model = require(dir + "/" + file);
					models.push(file.replace(".js", ""));
					callback(null, model);
				});
			}
		});
	}
	for (var i = 0; i < dirs.length; i++) {
		bootstrap(dirs[i]);
	}

	async.parallel(funcs, function() {
		console.log("loaded models: " + models.join(", "));
	});
};
