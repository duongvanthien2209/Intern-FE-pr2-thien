const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Response = require("../../helpers/response.helper");

// Models
const User = require("../../models/User.model");

exports.example = (req, res) => {
  res.send("Done");
};

exports.register = async (req, res, next) => {
  const {
    email,
    username,
    fullname,
    phone,
    address,
    birthday,
    gender,
    password,
  } = req.body;

  // debugger;

  try {
    let user = await User.findOne({ email });
    if (user) throw new Error("Email đã tồn tại");

    user = await User.findOne({ username });
    if (user) throw new Error("Tên đăng nhập đã tồn tại");

    const dateParts = birthday.split("/");
    // Tạo mã hóa
    const salt = await bcrypt.genSalt(10);

    user = await User.create({
      email,
      username,
      fullname,
      phone,
      address,
      birthday: new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10)
      ),
      gender,
      password: await bcrypt.hash(password, salt),
    });

    return Response.success(res, { message: "Tạo tài khoản thành công" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user) throw new Error("Tên đăng nhập hoặc email không tồn tại");

    // Result: boolean
    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new Error("Bạn nhập sai mật khẩu");

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return Response.success(res, { token });
      }
    );

    return;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
