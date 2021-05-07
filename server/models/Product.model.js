const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  brand_name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  review_count: { type: Number, default: 0 },
  rating_average: { type: Number, default: 5 },
});

module.exports = mongoose.model("Product", ProductSchema, "products");
