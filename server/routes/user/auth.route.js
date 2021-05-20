const express = require("express");
const router = express.Router();

const {
  example,
  register,
  login,
} = require("../../controllers/user/auth.controller");

router.get("/", example);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
