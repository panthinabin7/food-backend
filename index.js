require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/CreateUser.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    // "mongodb+srv://panthinabin7:wg86pPSRKVMb2Aau@cluster0.9g3njsv.mongodb.net/food?retryWrites=true&w=majority"
    process.env.MONGO_URI
  );

  console.log("database connected");
}

// body parser
app.use(express.json());
app.use("/", productRouter.router);
app.use("/api/", userRouter.router);

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
