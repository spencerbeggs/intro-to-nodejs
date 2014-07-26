function orderBurger(style, callback) {
	var cookingTime;
	if (style === "well done") {
		cookingTime = 5000;
	} else if (style === "rare") {
		cookingTime = 2500;
	}
	setTimeout(function() {
		callback(style);
	}, cookingTime);
}

orderBurger("well done", function(style) {
	console.log("Doug got his " + style + "burger");
});

orderBurger("rare", function(style) {
	console.log("Mary got her " + style + "burger");
});