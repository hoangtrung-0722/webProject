const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

const authController = require("../controllers/authController");

router.get("/login", authController.openLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Password or username is incorrect",
  }),
  function (res, req) {
    res.redirect("/");
  }
);

router.get("/register", authController.openRegister);

router.post("/register", authController.registerUser);

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
