const mongoose = require("mongoose");

//! create a schema of your model/collection
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  mail: String,
  DOB: String,
  gender: String,
  course: String,
  profile_url: String,
  password: String,
  rePassword: String,
});

//! assign your model with schema
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
