const express = require("express");

const router = express.Router();

const {
  addCategory,
  getCategory,
  addProduct,
  getProduct,
  getAllProduct,
  getProductByCategory,
  getAllNameCategory,
} = require("../controllers/example.controller");

router.get("/category/getAllName", getAllNameCategory);
router.get("/category", getCategory);
// router.get("/", (req, res) => res.send("Done"));
router.post("/category", addCategory);

router.post("/product/add", addProduct);
router.post("/product/get", getProduct);
router.get("/product/getAll", getAllProduct);
router.get("/product/getByCategory", getProductByCategory);

module.exports = router;
