var $ = {};
$.foo = function() {
	console.log("Called foo()");
};
$.bar = function() {
	console.log("Called bar()");
};
window.$ = $;