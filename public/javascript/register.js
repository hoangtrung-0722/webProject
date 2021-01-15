$().ready(function () {
  let username_available = 0;
  const usernameRegex = new RegExp(
    "^(?=.{8,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$"
  );
  $("#register-form").submit(function (event) {
    const password = $("#register-form").find("input[name=password]");
    const repeat_password = $("#register-form").find(
      "input[name=repeat-password]"
    );
    const username = $("#register-form").find('input[name="username"]');
    if (!username_available) {
      username.parent().removeClass();
      username.parent().addClass("form-error");
      username.prepend("<p>Sorry... Username already taken</p>");
      username.siblings("p").addClass("text-error");
      event.preventDefault();
    }
    if (repeat_password.val() != password.val()) {
      password.parent().removeClass();
      repeat_password.parent().addClass("form-error");
      repeat_password.parent().prepend("<p>Repeat password does not match</p>");
      repeat_password.siblings("p").addClass("text-error");
      event.preventDefault();
    }
  });

  $("#register-form")
    .find('input[name="username"]')
    .on("blur", function () {
      const username = $('input[name="username"]');
      username.siblings("p").each(function () {
        $(this).remove();
      });
      const value = username.val();
      if (value == "") {
        return;
      } else if (!value.match(usernameRegex)) {
        username.parent().removeClass();
        username.parent().addClass("form-error");
        username
          .parent()
          .prepend("<p>Username does not match the requested format</p>");
        username.siblings("p").addClass("text-error");
        username_available = 0;
      } else {
        $.ajax({
          url: "/register",
          type: "post",
          data: {
            username: username.val(),
          },
          success: function (response) {
            if (response == "taken") {
              username.parent().removeClass();
              username.parent().addClass("form-error");
              username
                .parent()
                .prepend("<p>Sorry... Username already taken</p>");
              username.siblings("p").addClass("text-error");
              username_available = 0;
            } else if (response == "not_taken") {
              username.parent().removeClass();
              username.parent().addClass("form-success");
              username.parent().prepend("<p>Username available</p>");
              username_available = 1;
            }
          },
        });
      }
    });

  $("#register-form")
    .find('input[name="password"]')
    .on("blur", function () {
      const password = $('input[name="password"]');
      password.siblings("p").remove();
      const value = password.val();
      if (value == "") {
        password.siblings("p").remove();
        password.parent().removeClass();
        return;
      } else if (!value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{6,}$")) {
        password.parent().addClass("form-error");
        password
          .parent()
          .prepend("<p>Password does not match the requested format</p>");
      } else {
        password.siblings("p").remove();
        password.parent().removeClass();
        password.parent().addClass("form-success");
      }
    });
});
