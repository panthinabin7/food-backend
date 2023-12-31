const model = require("../model/product");
const Product = model.Product;

const catModel = require("../model/productCategory");
const ProductCategory = catModel.ProductCategory;

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  const productCategory = await ProductCategory.find();

  global.food_items = products;
  global.food_category = productCategory;

  const data = [products, productCategory];

  res.json(data);
  // res.send(products, productCategory);
};
