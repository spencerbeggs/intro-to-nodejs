var fs = require("fs");

fs.watch(__dirname, function(event, filename) {
	console.log(event);
	console.log(filename);
});