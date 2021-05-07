const express = require("express");
const router = express.Router();

// Constrollers
const {
  getAll,
  updateStatus,
} = require("../../controllers/admin/order.controller");

router.get("/getAll", getAll);

router.post("/updateStatus/:orderId", updateStatus);

module.exports = router;
