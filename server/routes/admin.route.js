const express = require("express");
const router = express.Router();

// Middlewares
const { protect } = require("../middlewares/admin/auth.middleware");

const handleError = require("../helpers/handleError.helper");

router.use("/auth", require("./admin/auth.route"));

router.use(handleError);

router.use(protect);

router.use("/user", require("./admin/user.route"));

router.use(handleError);

router.use("/order", require("./admin/order.route"));

router.use(handleError);

router.use("/orderDetail", require("./admin/orderDetail.route"));

router.use(handleError);

router.use("/product", require("./admin/product.route"));

router.use(handleError);

module.exports = router;
