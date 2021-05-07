const express = require("express");
const router = express.Router();

const {
  getByCategory,
  getByFilter,
  getProduct,
} = require("../../controllers/user/product.controller");

router.get("/:productId", getProduct);

router.get("/getByCategory/:categoryId", getByCategory);

router.get("/getByFilter/:categoryId", getByFilter);

module.exports = router;
