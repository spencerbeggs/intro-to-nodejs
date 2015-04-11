var $ = {};
$.foo = function() {
	console.log("Called foo()");
};
$.baz = function() {
	console.log("Called baz()");
};
window.$ = $;