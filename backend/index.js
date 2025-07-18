const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//MONGODB CONNECTION
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to Datebase"))
  .catch((err) => console.log(err));
//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//API

app.get("/", (req, res) => {
  res.send("Server is running");
});
// app.post("/signup", async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { email } = req.body;

//     const existingUser = await userModel.findOne({ email });

//     if (existingUser) {
//       res.send({ message: "Email ID is already registered" });
//     } else {
//       const newUser = new userModel(req.body);
//       await newUser.save();
//       res.send({ message: "Successfully signed up" });
//     }
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  // userModel.findOne({ email: email }, (err, result) => {
  //   console.log(result);
  //   console.log(err);
  if (existingUser) {
    res.send({ message: "email id is already register" });
  } else {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send({ message: "Successfully signed up" });
  }
});
app.listen(PORT, () => console.log("server is running at port:" + PORT));
