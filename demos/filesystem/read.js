var fs = require("fs");
var path = require("path");

fs.readFile(path.resolve(__dirname + "/../../package.json"), {
	encoding: "utf-8"
}, function(err, data) {
	if (err) {
		throw err;
	}
	console.log(data);
});