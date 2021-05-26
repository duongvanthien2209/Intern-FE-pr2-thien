const express = require("express");
const router = express.Router();

// Constrollers
const {
  getOrder,
  addOrder,
} = require("../../controllers/user/order.controller");

// Lấy thông tin hóa đơn cụ thể
router.get("/:orderId", getOrder);

// Tạo hóa đơn
router.post("/addOrder", addOrder);

module.exports = router;
