const express = require("express");
const router = express.Router();

// Controllers
const {
  getAll,
  getChildCategory,
} = require("../../controllers/user/category.controller");

// Lấy danh sách Category
router.get("/", getAll);

// Lấy danh sách Category con
router.get("/:categoryId", getChildCategory);

module.exports = router;
