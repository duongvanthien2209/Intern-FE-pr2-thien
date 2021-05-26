const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  payMethod: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 'Đang xử lý', 'Đang giao hàng', 'Đã thanh toán', 'Đã hủy'
  status: { type: String, default: "Đang xử lý" },
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema, "orders");
