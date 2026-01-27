//! exporting express
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

//! connection with different port number
const cors = require("cors");
app.use(cors());

//! Connect with database
const connectDB = require("./config/db");
connectDB();

//! import collection(s)/model(s)
const { userModel } = require("./models/user");

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

  const result = await userModel.insertOne({
    fname,
    lname,
    mail,
    DOB,
    gender,
    course,
    profile_url,
    password,
    rePassword,
  });
  console.log(result);
  res.status(201).json({ message: "Register successfully", result });
});

//* User login
app.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await userModel.findOne({ mail });

    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }

    if (user.password != password) {
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

    const updatedData = await userModel.updateOne(
      { _id },
      { $set: { _id, ...data } },
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

app.listen(process.env.PORT, () => {
  console.log("Server is runinng...");
});
