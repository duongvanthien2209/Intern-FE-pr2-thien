const express = require("express");

const router = express.Router();

const handleError = require("../helpers/handleError.helper");

router.get("/", (req, res) => res.send("Done"));

router.use("/auth", require("./user/auth.route"));

router.use(handleError);

module.exports = router;
