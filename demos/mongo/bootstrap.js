var connect = "mongodb://spencer.codes:27017/demo";
var _ = require("lodash");
var mongojs = require("mongojs");
var db = mongojs(connect, ["animals"]);
var async = require("async");

var types = ["cow", "pig", "chicken"];
var weights = [1, 2, 5, 11, 13, 16, 25, 44, 62];
var names = ["Tom", "Sally", "Erin", "Brad", "Tim", "Chuck", "Lauren", "Susan", "Dolly"];

var funcs = [];

function makeFunc(type, weight, name) {
	return function(cb) {
		db.animals.save({
			type: type,
			weight: weight,
			name: name
		}, function() {
			console.log("saved");
			cb(null);
		});
	};
}

for (var i = 0; i < 100; i++) {
	funcs.push(makeFunc(_.sample(types), _.sample(weights), _.sample(names)));
}

async.parallel(funcs, function() {
	console.log("done!");
});