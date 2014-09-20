// an example using an object instead of an array
var async = require("async");
async.series([

		function(callback) {
			setTimeout(function() {
				callback(null, "foo");
			}, 200);
		},
		function(callback) {
			setTimeout(function() {
				callback(null, 2);
			}, 100);
		}
	],
	function(err, results) {
		// results is now equal to: {one: 1, two: 2}
		console.log(results);
	});
