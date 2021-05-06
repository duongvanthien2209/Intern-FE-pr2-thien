const express = require("express");

const router = express.Router();

// User Route
router.use("/user", require("./user.route"));

// Admin Route
router.use("/admin", require("./admin.route"));

module.exports = router;
