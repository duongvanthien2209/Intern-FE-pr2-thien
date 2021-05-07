const jwt = require("jsonwebtoken");

const Response = require("../../helpers/response.helper");

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw new Error("Có lỗi xảy ra");

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    )
      throw new Error("Có lỗi xảy ra");

    const payload = {
      admin: {
        username,
        password,
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

    // return;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
