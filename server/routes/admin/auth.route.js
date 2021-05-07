const express = require("express");
const router = express.Router();

// Constollers
const { login } = require("../../controllers/admin/auth.controller");

router.post("/login", login);

module.exports = router;
