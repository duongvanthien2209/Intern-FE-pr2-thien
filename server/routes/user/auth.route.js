const express = require("express");
const router = express.Router();

// Middlewares
const { protect } = require("../../middlewares/user/auth.middleware");

const { register, login } = require("../../controllers/user/auth.controller");

// router.get("/", example);
router.get("/getMe", protect);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
