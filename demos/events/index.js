var http = require("http");

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain"
	});
	res.end("Hello World\n");
}).listen(3000, "127.0.0.1");
console.log("Server running at http://127.0.0.1:3000");

server.on("connection", function() {
	console.log("client connected!");
});
