var connect = "mongodb://104.236.204.157:27017/farm";
var mongojs = require("mongojs");
var db = mongojs(connect, ["animals"]);

db.animals.find({
	name: "Spencer",
	weight: {
		$gt: 10,
		$lte: 16
	}
}, function(err, docs) {
	console.log(docs);
});

// db.animals.insert({
// 	name: "Spencer",
// 	weight: 500,
// 	type: "Snake",
// 	color: "blue"
// }, function(err, doc) {
// 	console.log(doc);
// });
