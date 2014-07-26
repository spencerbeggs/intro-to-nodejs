function omakase() {
	var fish = ["tuna", "salmon", "mackerel"];
	var sushi = fish[Math.floor(Math.random() * fish.length)];
	return sushi;
}

console.log("Doug got " + omakase());
console.log("Mary got " + omakase());
