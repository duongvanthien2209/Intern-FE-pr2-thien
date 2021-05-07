const express = require("express");
const router = express.Router();

// Controllers
const {
  deleteProduct,
} = require("../../controllers/admin/orderDetail.controller");

// Xóa 1 orderDetail
router.get("/delete/:orderDetailId", deleteProduct);

module.exports = router;
