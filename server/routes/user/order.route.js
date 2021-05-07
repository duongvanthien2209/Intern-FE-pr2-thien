const express = require("express");
const router = express.Router();

// Constrollers
const {
  getOrder,
  addOrder,
  getAllOrder,
  cancelOrder,
} = require("../../controllers/user/order.controller");

// Lấy lịch sử hóa đơn của người dùng
router.get("/orderHistory", getAllOrder);

// Hủy hóa đơn
router.get("/cancelOrder/:orderId", cancelOrder);

// Lấy thông tin hóa đơn cụ thể
router.get("/:orderId", getOrder);

// Tạo hóa đơn
router.post("/addOrder", addOrder);

module.exports = router;
