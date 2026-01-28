//! exporting express
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

//! connection with different port number
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
//! Connect with database
const connectDB = require("./config/db");
connectDB();

//! import collection(s)/model(s)
const { userModel } = require("./models/user");
const sendMessageViaMail = require("./config/email");

//* check server connection
app.get("/test", (req, res) => {
  res.status(200).json({ message: "This is a healthy connection." });
});

//* fetch all users
app.get("/allusers", async (req, res) => {
  try {
    const allusers = await userModel.find();
    res.status(200).json({ users: allusers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
});

//* User fetch by id
app.get("/allusers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const _id = id;

    const currentUser = await userModel.findOne({ _id });
    if (!currentUser) {
      return res.json({ message: "User not found" });
    }
    res.status(200).json({ data: currentUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
});

//* User register
app.post("/register", async (req, res) => {
  const {
    fname,
    lname,
    mail,
    DOB,
    gender,
    course,
    profile_url,
    password,
    rePassword,
  } = req.body;

  const isExists = await userModel.findOne({ mail: mail });
  // console.log(isExists);

  if (isExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await userModel.insertOne({
    fname,
    lname,
    mail,
    DOB,
    gender,
    course,
    profile_url,
    password: hashPassword,
    rePassword: hashPassword,
  });
      sendMessageViaMail(
        mail,
        "Registration successfull",
        "First message to verify nodemailer",
      );
  res.status(201).json({ message: "Register successfully" });
});

//* User login
app.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await userModel.findOne({ mail });

    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ message: "Incorrect password" });
    }

    const token = "DFGhgcCGFGG." + user._id;

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
});

//* Update user
app.put("/allusers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const _id = id;
    const data = req.body;

    const hashPassword = await bcrypt.hash(data.password, 10);

    const updatedData = await userModel.updateOne(
      { _id },
      {
        $set: {
          _id,
          ...data,
          password: hashPassword,
          rePassword: hashPassword,
        },
      },
    );
    res.status(200).json({ message: "user is updated successfully.", data });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

//* Delete User
app.delete("/allusers/:id", async (req, res) => {
  const { id } = req.params;
  const _id = id;

  await userModel.deleteOne({ _id });

  res.status(204).json({ message: "user Deleted successfully." });
});

//* Reset Password
app.post("/resetpassword", async (req, res) => {
  try {
    const { mail, password, rePassword } = req.body;
    const user = await userModel.findOne({ mail: mail });

    if (!user) {
      return res.status(409).json({ message: "User not exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.updateOne(
      { mail },
      { $set: { password: hashPassword, rePassword: hashPassword } },
    );
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is runinng...");
});
