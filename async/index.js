// an example using an object instead of an array
var async = require("async");
async.series({
		one: function(callback) {
			setTimeout(function() {
				callback(null, 1);
			}, 200);
		},
		two: function(callback) {
			setTimeout(function() {
				callback(null, 2);
			}, 100);
		}
	},
	function(err, results) {
		// results is now equal to: {one: 1, two: 2}
	});
