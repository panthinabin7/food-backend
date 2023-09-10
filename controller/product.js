const fs = require("fs");

const model = require("../model/product");
const Product = model.Product;

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
