const mongoose = require("mongoose");
const userService = require("../models/services/userService");
const User = require("../models/User");

module.exports.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('back');
  }
  const user = req.user;

  res.render("profile", {
    title: user.username + "'s profile",
  });
};

module.exports.openEdit = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('back');
  }

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  res.render("edit_profile", {
    title: 'Edit '+req.user+'\'s profile',
    name: name,
    email: email,
    phone: phone,
    address: address,
  });
};

module.exports.edit = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  const user = req.user;
  if (name != "") {
    user.name = name;
  }
  if (email != "") {
    user.email = email;
  }
  if (phone != "") {
    user.phone = phone;
  }
  if (address != "") {
    user.address = address;
  }

  await User.updateOne(
    {
      _id: mongoose.Types.ObjectId(user._id),
    },
    {
      $set: user,
    }
  );

  req.session.save(function (err) {
    req.session.reload(function (err) {
      res.redirect("/users/profile");
    });
  });
  //res.redirect("/users/profile");
};
