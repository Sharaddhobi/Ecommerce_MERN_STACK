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
//signup
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  // userModel.findOne({ email: email }, (err, result) => {
  //   console.log(result);
  //   console.log(err);
  if (existingUser) {
    res.send({ message: "Email is already registered", alert: false });
  } else {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send({ message: "Successfully signed up", alert: true });
  }
});
//api login
app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  // userModel.findOne({ email: email }, (err, result) => {
  const existingUser = await userModel.findOne({ email: email });

  if (existingUser) {
    const dataSend = {
      _id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      image: existingUser.image,
    };
    if (existingUser.password == password) {
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Incorrect password!!",
        alert: false,
      });
    }
    // console.log(dataSend);
  } else {
    res.send({
      message: "Email is not available, Please sign up",
      alert: false,
    });
  }
});

//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);
// save product in data

//product data by id
app.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.send({ success: false, message: "Product not found" });
    }

    res.send({ success: true, data: product });
  } catch (error) {
    // console.error("Error fetching product:", error);
    res.send({ success: false, message: "Internal server error" });
  }
});

//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(data);
});

//update product by productId
app.put("/product/update/:productId", async (req, res) => {
  const productId = req.params.productId;

  const { name, category, price, description, image } = req.body;
  // console.log(image);
  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.send({ type: "error", message: "Product not found" });
    }

    // Update product's information
    product.name = name;
    product.category = category;
    product.price = price;
    product.description = description;
    product.image = image;

    // Save the updated product
    await product.save();

    res.send({
      message: "Product Updated Successfully!!!",
      type: "success",
    });
  } catch (error) {
    // console.error("Error updating product:", error);

    res.send({
      message: "Fail to update product.",
      type: "error",
    });
  }
});
//delete product by id
app.post("/product/delete/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.send({ message: "Product not found" });
    }

    await productModel.deleteOne({ _id: productId });

    res.send({ message: "Product deleted successfully", type: "success" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error deleting product" });
  }
});
// });

//server is ruuning

app.listen(PORT, () => console.log("server is running at port:" + PORT));
