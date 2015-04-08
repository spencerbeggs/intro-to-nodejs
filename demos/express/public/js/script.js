$(document).ready(function() {
	$(".animal").on({
		click: function() {
			$.ajax({
				url: "/kill",
				type: "POST",
				data: {
					animal: $(this).data("id")
				},
				success: function() {
					$(this).hide();
				}
			});
		}
	});
});
