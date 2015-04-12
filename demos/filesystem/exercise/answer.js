var fs = require("fs");
var toRoman = require("roman-numerals").toRoman;

// read the text file
fs.readFile(__dirname + "/sonnets.txt", {
	encoding: "utf8"
}, function(err, text) {
	// inside the callback split the text into an array at the breaks;
	var sonnets = text.split("---\n");
	// loop over the array
	for (var i = 0; i < sonnets.length; i++) {
		//save each sonnet as its own file
		fs.writeFile(__dirname + "/output/" + toRoman(i) + ".txt", sonnets[i], function() {
			console.log("file saved");
		});
	}
});