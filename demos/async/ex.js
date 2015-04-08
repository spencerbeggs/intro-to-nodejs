// an example using an object instead of an array
//var async = require("async");
var fs = require("fs");

function delay(time) {
	var d1 = new Date();
	var d2 = new Date();
	while (d2.valueOf() < d1.valueOf() + time) {
		d2 = new Date();
	}
}

var catSays = "?";
var dogSays = "?";
var cowSays = "?";

fs.readFile("./cat.txt", {
	encoding: "utf-8"
}, function(err, data) {
	catSays = data;
});

fs.readFile("./dog.txt", {
	encoding: "utf-8"
}, function(err, data) {
	dogSays = data;
});

fs.readFile("./cow.txt", {
	encoding: "utf-8"
}, function(err, data) {
	cowSays = data;
});

delay(5000);
console.log("The cat says " + catSays);
console.log("The dog says " + dogSays);
console.log("The cow says " + cowSays);
