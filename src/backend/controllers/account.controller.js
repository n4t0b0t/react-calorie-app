const mongoose = require("mongoose");
require("../db");
require("../models/user.model");
// const bcrypt = require("bcrypt");

const UserModel = mongoose.model("User");

const loginUser = async input => {
  return await UserModel.findOne({
    username: input.username,
    password: input.password
  });
};

const secureUser = async input => {
  return await UserModel.findById(input);
};

const signUpUser = async input => {
  const newUser = new UserModel({ ...input, foodLog: [] }); // creates blank foodlog for new user by default
  return await newUser.save();
};

module.exports = { loginUser, secureUser, signUpUser };
