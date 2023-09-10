const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: { type: String },
  options: [{ half: { type: Number }, full: { type: Number } }],
  description: String,
});

exports.Product = mongoose.model("food_items", ProductSchema);
