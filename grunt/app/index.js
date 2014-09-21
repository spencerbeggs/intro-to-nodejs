var $ = require("jquery");
var Librarian = require("../lib/librarian");
var Book = require("../lib/book");

function recommend(librarian, book) {
	alert(librarian.name + " thinks you should read " + book.title);
}

$(document).ready(function() {
	var george = new Librarian("George", ["Monday", "Wednesday", "Friday"]);
	var hungerGames = new Book("The Hunger Games", "Gary Ross");
	recommend(george, hungerGames);
});
