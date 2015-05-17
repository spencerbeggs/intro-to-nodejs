var connect = "mongodb://spencer.codes:27017/demo";
var _ = require("lodash");
var mongojs = require("mongojs");
var db = mongojs(connect, ["places"]);
var async = require("async");

var places = [{
	name: "Blossom Organic",
	type: "restaurant",
	loc: [-74.00230, 40.745456]
}, {
	name: "P.C. Richard & Son",
	type: "store",
	loc: [-73.991531, 40.742724]
}, {
	name: "Barry's Bootcamp",
	type: "gym",
	loc: [-73.995650, 40.741765]
}, {
	name: "Bed Bath & Beyond",
	type: "store",
	loc: [-73.994417, 40.739944]
}, {
	name: "The Standard Hotel",
	type: "hotel",
	loc: [-74.008013, 40.741464]
}, {
	name: "Library Hotel",
	type: "hotel",
	loc: [-73.979356, 40.752611]
}, {
	name: "The Apple Store",
	type: "store",
	loc: [-73.972382, 40.764232]
}];

var funcs = [];

function makeFunc(place) {
	return function(cb) {
		db.places.save(place, function() {
			console.log("saved");
			cb(null);
		});
	};
}

for (var i = 0; i < places.length; i++) {
	funcs.push(makeFunc(places[i]));
}

async.parallel(funcs, function() {
	console.log("done!");
});