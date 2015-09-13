var connect = "mongodb://intro:test@ds035348.mongolab.com:35348/intro";
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

// db.places.find({
// 	//type: "restaurant",
// 	loc: {
// 		$near: [-73.989546, 40.739653],
// 		$maxDistance: 10 / 69
// 	}
// }, function(err, docs) {
// 	console.log(docs);
// });
