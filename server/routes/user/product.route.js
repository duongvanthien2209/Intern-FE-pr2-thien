const express = require("express");
const router = express.Router();

const {
  getByCategory,
  getByFilter,
} = require("../../controllers/user/product.controller");

router.get("/getByCategory/:categoryId", getByCategory);

router.get("/getByFilter/:categoryId", getByFilter);

module.exports = router;
