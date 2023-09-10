const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://panthinabin7:wg86pPSRKVMb2Aau@cluster0.9g3njsv.mongodb.net/food?retryWrites=true&w=majority";

async function mongoDB() {
  // await mongoose.connect(mongoURI);
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // const fetched_data = await mongoose.connection.db.collection("food_items");
  // fetched_data.find({}).toArray(function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(data);
  //   }
  // });
}

module.exports = mongoDB;
