const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "OrderDetail",
  OrderDetailSchema,
  "orderDetails"
);
