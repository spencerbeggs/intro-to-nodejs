var fs = require("fs");

fs.readFile(__dirname + "/cat.txt", {
	encoding: "utf-8"
}, function(err, data) {
	if (err) {
		throw err;
	}
	console.log(data);
});