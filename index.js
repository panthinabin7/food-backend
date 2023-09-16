require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRouter = require("./routes/DisplayData.js");
const userRouter = require("./routes/CreateUser.js");
const orderRouter = require("./routes/OrderData.js");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/", productRouter.router);
app.use("/api/", userRouter.router);
app.use("/api/", orderRouter.router);

// mongodb connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("database connected");
}

// body parser

// app.use("/api/", "./routes/OrderData.js");

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
