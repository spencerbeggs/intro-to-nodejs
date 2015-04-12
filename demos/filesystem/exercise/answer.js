// Challenge: Write a program that reads the file sonnets.tx
// in this directory. The file contains Shakspeare's 154 sonnets
// seperated by the characters ---. Your program should seperate the
// the sonnets into individual files and save them by number in the
// output directory.

// Use the Filesystem module: https://nodejs.org/api/fs.html

// HINT: In JS you can reference a linebreak with "\t"
// so "some text\t" is the line "some text" followed by a linebreak

// get a reference to the filesystem module
var fs = require("fs");

// read the text file
fs.readFile(__dirname + "/sonnets.txt", {
	encoding: "utf8"
}, function(err, text) {
	// inside the callback split the text into an array at the breaks;
	var sonnets = text.split("---\n");
	// loop over the array
	for (var i = 0; i < sonnets.length; i++) {
		//save each sonnet as its own file
		fs.writeFile(__dirname + "/output/" + i, sonnets[i], function() {
			console.log("file saved");
		});
	}
});