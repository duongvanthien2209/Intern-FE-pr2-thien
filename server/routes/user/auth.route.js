const express = require("express");
const router = express.Router();

// Middlewares
const { protect } = require("../../middlewares/user/auth.middleware");

const {
  register,
  login,
  getMe,
  updateInfo,
  changePassword,
} = require("../../controllers/user/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.use(protect);

router.get("/getMe", getMe);

router.post("/updateInfo", updateInfo);

router.post("/changePassword", changePassword);

module.exports = router;
