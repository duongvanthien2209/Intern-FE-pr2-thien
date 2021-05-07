const fs = require("fs-promise");
const cloudinary = require("../../config/cloudinaryConfig");

// Models
const Product = require("../../models/Product.model");

const Response = require("../../helpers/response.helper");

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) throw new Error("Có lỗi xảy ra");

    await Product.findByIdAndRemove(productId);

    return Response.success(res, { message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const {
    file,
    params: { productId },
    body: { name, description, price, brand_name },
  } = req;

  try {
    if (!productId || !name || !description || !price || !brand_name)
      throw new Error("Có lỗi xảy ra");

    const product = await Product.findById(productId);

    if (!product) throw new Error("ProductId không hợp lệ");

    let objUpdate = { name, description, price, brand_name };

    if (file) {
      let orgName = file.originalname || "";
      orgName = orgName.trim().replace(/ /g, "-");
      const fullPathInServ = file.path;
      const newFullPath = `${fullPathInServ}-${orgName}`;
      fs.rename(fullPathInServ, newFullPath);

      const result = await cloudinary.uploader.upload(newFullPath);

      objUpdate.image = result.url;
    }

    await Product.findByIdAndUpdate(productId, objUpdate);

    return Response.success(res, {
      message: "Cập nhật thành công",
      product: await Product.findById(productId),
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
