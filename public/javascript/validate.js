$().ready(function() {
	$("#register-form").validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		rules: {
			"username": {
				required: true,
				maxlength: 20
			},
			"password": {
				required: true,
				minlength: 6
			},
			"re-password": {
				equalTo: "#password",
				minlength: 6
			}
		}
	});
});