const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });

const {
  deleteProduct,
  updateProduct,
} = require("../../controllers/admin/product.controller");

router.get("/delete/:productId", deleteProduct);

// Cập nhật sản phẩm
router.post("/update/:productId", upload.single("file"), updateProduct);

module.exports = router;
