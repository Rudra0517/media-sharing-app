const mongoose = require("mongoose");

const connectDB = async () => {
  //! store your mongoDB connection port number in a variable
  const url = process.env.MONGODB_URL;

  try {
    //! connect your database with mongoose driver
    await mongoose.connect(url);
    console.log("DB also connected...");
  } catch (error) {
    console.log("Failed to connect");
  }
};

module.exports = connectDB;
