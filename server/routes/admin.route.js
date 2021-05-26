const express = require("express");

const router = express.Router();

const handleError = require("../helpers/handleError.helper");

router.use("/auth", require("./admin/auth.route"));

router.use(handleError);

module.exports = router;
