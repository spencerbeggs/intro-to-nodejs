var server = require('http').createServer();

server.on('request', function(req, res) {
	console.log(req);
	res.end('Thank you for using our service!');
});
server.listen(8080);