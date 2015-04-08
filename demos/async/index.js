// an example using an object instead of an array
var async = require("async");
var fs = require("fs");

function readFile(filepath) {
	return function(callback) {
		fs.readFile(filepath, {
			encoding: "utf-8"
		}, function(err, data) {
			if (err) {
				callback(err);
			}
			console.log("read: " + filepath);
			callback(null, data);
		});
	};
}

var funcs = {};
funcs.foo = readFile("./cat.txt");
funcs.bar = readFile("./foo.txt");
funcs.baz = readFile("./cow.txt");

async.series(funcs, function(err, results) {
	if (err) {
		console.log(err);
		//throw err;
	}
	console.log(results);
});
