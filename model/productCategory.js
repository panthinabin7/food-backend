const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  CategoryName: String,
});

exports.ProductCategory = mongoose.model(
  "ProductCategory", // Model name (capitalized, singular)
  ProductCategorySchema,
  "food_category" // Collection name
);
