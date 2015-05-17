var https = require("https");
var fs = require("fs");
var url = "https://api.instagram.com/v1/media/popular?client_id=6571a0547b8b487a81b5ebf51b913b12";
var _ = require("lodash");

https.get(url, function(res) {
	var photo = "";
	res.on("data", function(chunk) {
		photo += chunk;
	});
	res.on("end", function() {
		var obj = JSON.parse(photo);
		var file = "";
		_.each(obj.data, function(entry) {
			file += entry.images.standard_resolution.url + "\n";
		});
		fs.writeFile(__dirname + "/url.txt", file, {
			encoding: "utf-8"
		}, function(err) {
			console.log("file saved");
		});
	});
});
