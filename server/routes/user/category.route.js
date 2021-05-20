const express = require("express");
const router = express.Router();

// Controllers
const { getAll } = require("../../controllers/user/category.controller");

router.get("/", getAll);

module.exports = router;
