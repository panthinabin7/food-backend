const express = require("express");
const CircularJSON = require("circular-json");
const router = express.Router();
const model = require("../model/orders");
const Order = model.Order;

router.post("/orderData", async (req, res) => {
  const { order_data, order_date, email } = req.body;

  // Create an array of objects for each order with its date
  const orders = order_data.map((order) => ({
    order_date,
    ...order,
  }));

  try {
    let eId = await Order.findOne({ email });

    if (eId === null) {
      await Order.create({
        email,
        order_data: orders, // Store as an array of objects
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: { $each: orders } } } // Append the new orders as separate objects
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

exports.router = router;

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// const express = require("express");
// const CircularJSON = require("circular-json");
// const router = express.Router();
// const model = require("../model/orders");
// const Order = model.Order;

// router.post("/orderData", async (req, res) => {
//   let data = req.body.order_data; // from front-end
//   // console.log(req.body.order_data);
//   await data.splice(0, 0, { order_date: req.body.order_date });
//   const str = CircularJSON.stringify(data);

//   console.log(str);

//   let eId = await Order.findOne({ email: req.body.email });

//   // console.log(eId, req.body.email);

//   if (eId === null) {
//     try {
//       await Order.create({
//         email: req.body.email,
//         order_data: [str],
//         // order_data: req.body.order_data,
//       });
//       res.json({ success: true });
//       // .then(() => {
//       //   res.json({ success: true });
//       // });
//     } catch (error) {
//       console.log(error.message);
//       // res.send("Server Error", error.message);
//       res.status(500).send("Server Error");
//     }
//   } else {
//     try {
//       await Order.findOneAndUpdate(
//         { email: req.body.email },
//         { $push: { order_data: [str] } }
//       );
//       res.json({ success: true });
//       // .then(() => {
//       //   res.json({ success: true });
//       // });
//     } catch (error) {
//       res.status(500).send("Server Error");
//       // res.status(500).send("Server Error");
//     }
//   }
// });

// exports.router = router;
