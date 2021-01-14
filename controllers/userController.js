const mongoose = require("mongoose");
const userService = require("../models/services/userService");
const User = require("../models/User");

module.exports.profile = (req, res) => {
  const user = req.user;
  console.log(user);

  res.render("profile", {
    title: user.username + "'s profile",
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });
};

module.exports.edit = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  const user = req.user;
  // user.name = name;
  // user.email = email;
  // user.phone = phone;
  // user.address = address;
  await User.updateOne(
    {
      _id: mongoose.Types.ObjectId(user._id),
    },
    {
      $set: {
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
    }
  );

  res.render("edit_profile", {
    name: name,
    email: email,
    phone: phone,
    address: address,
  });
};
