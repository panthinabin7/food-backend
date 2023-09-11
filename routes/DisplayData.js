const express = require("express");
const productController = require("../controller/product");

const router = express.Router();

router.post("/foodData", productController.getProducts);

exports.router = router;
