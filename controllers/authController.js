const User = require("../models/User");

module.exports.openLogin = async (req, res, next) => {
  console.log(req.flash("error")[0]);
  res.render("auth/login", { title: "Login", error: req.flash("error")[0] });
};

module.exports.openRegister = (req, res, next) => {
  res.render("auth/register", { title: "Register" });
};

module.exports.registerUser = async (req, res, next) => {
  if (!req.body.password) {
    const user = await User.find({
      username: req.body.username,
      isAdmin: false,
    });
    if (user.length == 0) {
      res.send("not_taken");
    } else {
      res.send("taken");
    }
    return;
  }

  await User.register(
    { username: req.body.username, active: false },
    req.body.password,
    function (err, user) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/register");
      } else {
        var authenticate = User.authenticate();
        authenticate(
          req.body.username,
          req.body.password,
          function (err, result) {
            if (err) {
              req.flash("error", err.message);
              res.redirect("/register");
            } else {
              res.redirect("/login");
            }
          }
        );
      }
    }
  );
};
