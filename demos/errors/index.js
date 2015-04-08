process.on("uncaughtException", function(err) {
	console.log("The was an exception!", err);
});

var server = require("http").createServer();
server.on("request", function(req, res) {
	foo();
	res.end("Hello, world!");
});
server.listen(8080);
