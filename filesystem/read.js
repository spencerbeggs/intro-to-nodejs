var fs = require("fs");

fs.readFile("./cat.txt", {
	encoding: "utf-8"
}, function(err, data) {
	if (err) {
		throw err;
	}
	console.log(data);
});
