const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product.js");

app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://panthinabin7:wg86pPSRKVMb2Aau@cluster0.9g3njsv.mongodb.net/food?retryWrites=true&w=majority"
  );

  console.log("database connected");
}

// body parser
app.use(express.json());
app.use("/product", productRouter.router);

app.listen(5000, () => {
  console.log("Server is running...");
});
