var url = "https://api.instagram.com/v1/media/popular?client_id=6571a0547b8b487a81b5ebf51b913b12"
var https = require("https");

https.get(url, function(res) {
	res.on("data", function(chunk) {
		process.stdout.write(chunk);
	});
});
