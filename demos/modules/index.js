var foo = require("./foo");

setInterval(function() {
	console.log(foo());
}, 1000);