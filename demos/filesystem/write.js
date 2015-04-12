var fs = require("fs");

fs.writeFile(__dirname + "/dog.txt", "woof!", {
	encoding: "utf-8"
}, function(err) {
	if (err) {
		throw err;
	}
	console.log("file saved!");
});