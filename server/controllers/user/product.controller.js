// Models
const Response = require("../../helpers/response.helper");
const Category = require("../../models/Category.model");
const Product = require("../../models/Product.model");

const limit = 20;

// Lấy luôn dữ liệu filter
exports.getByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    if (!categoryId) throw new Error("Có lỗi xảy ra");

    const category = await Category.findById(categoryId);

    if (!category) throw new Error("Category không hợp lệ");

    const products = await Product.find({ category: category._id });

    if (!products) throw new Error("Có lỗi xảy ra");

    if (products.length > 0) {
      let brands = [];

      let max = 0;
      let min = products[0].price;

      products.forEach((product) => {
        const index = brands.indexOf(product.brand_name);

        if (index < 0) brands.push(product.brand_name);

        if (product.price > max) max = product.price;

        if (product.price < min) min = product.price;
      });

      if (max === min) throw new Error("Có lỗi xảy ra");

      let space = (max - min) / 4;
      let co1 = Math.round(min + space);
      let mid = Math.round(min + 2 * space);
      let co3 = Math.round(max - space);

      return Response.success(res, {
        currentCategory: { id: category.id, name: category.name },
        brands,
        price: [
          { from: 0, to: co1 },
          { from: co1, to: mid },
          { from: mid, to: co3 },
          { from: co3, to: 0 },
        ],
      });
    }

    return Response.success(res, {
      currentCategory: { id: category.id, name: category.name },
      brands: [],
      price: [],
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getByFilter = async (req, res, next) => {
  const { categoryId } = req.params;

  const { rating, brands, price, page = 1 } = req.query;

  try {
    if (!categoryId) throw new Error("Có lỗi xảy ra");

    let category = await Category.findById(categoryId);

    if (!category) throw new Error("Category Id không tồn tại");

    let queryObj = { $and: [{ category: category._id }] };

    if (rating)
      queryObj.$and.push({ rating_average: { $gte: parseInt(rating) } });

    if (brands) queryObj.$and.push({ brand_name: { $in: brands } });

    if (price) {
      const from = parseInt(price.from);
      const to = parseInt(price.to);
      if (from === 0 && to !== 0) {
        queryObj.$and.push({
          $and: [{ price: { $lte: to } }],
        });
      } else if (from !== 0 && to === 0) {
        queryObj.$and.push({
          $and: [{ price: { $gte: from } }],
        });
      } else {
        queryObj.$and.push({
          $and: [{ price: { $gte: from } }, { price: { $lte: to } }],
        });
      }
    }

    const total = await Product.find(queryObj).count();
    let products = await Product.find(queryObj)
      .skip((parseInt(page) - 1) * limit)
      .limit(limit);

    if (!products) throw new Error("Có lỗi xảy ra");

    return Response.success(res, { products, total });
  } catch (error) {
    return next(error);
  }
};
