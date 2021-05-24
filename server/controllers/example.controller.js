const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

const axios = require("axios");
const fs = require("fs");

function readFile(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) return rejects(err);
      return resolve(data);
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, rejects) => {
    fs.writeFile(path, data, (err) => {
      if (err) return rejects(err);
      return resolve();
    });
  });
}

exports.getAllNameCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    let result = [];

    for (let category of categories) {
      if (!category.parentCategory) {
        let childResult = [];

        let childCategories = await Category.find({
          parentCategory: category.id,
        });

        if (!childCategories) throw new Error("Có lỗi xảy ra");

        for (let childCategory of childCategories) {
          let childChildResult = [];

          let childChildCategories = await Category.find({
            parentCategory: childCategory.id,
          });

          if (!childChildCategories) throw new Error("Có lỗi xảy ra");

          childChildResult = childChildCategories.map((childChildCategory) => ({
            name: childChildCategory.name,
          }));

          if (childChildResult.length > 0) {
            childResult.push({
              name: childCategory.name,
              childs: childChildResult,
            });
          } else childResult.push({ name: childCategory.name });
        }

        if (childResult.length > 0) {
          result.push({ name: category.name, childs: childResult });
        }
      }
    }

    console.log(result);

    return res.json({ categories: result });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

exports.addCategory = async (req, res) => {
  const { name, parentName } = req.body;

  try {
    let obj = { name };

    if (parentName) {
      const parentCategory = await Category.findOne({ name: parentName });

      if (!parentCategory) throw new Error("Parent Category không hợp lệ");

      obj.parentCategory = parentCategory._id;
    }

    await Category.create(obj);
    return res.send("Thêm thành công");
  } catch (error) {
    return res.send(error.message);
  }
};

exports.getCategory = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.addProduct = async (req, res) => {
  const { link, categoryName } = req.body;

  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) throw new Error("Tên category không hợp lệ");

    const {
      data: { data },
    } = await axios.get(link);

    await Promise.all(
      data.map(async (item) => {
        const product = await Product.findOne({ name: item.name });

        if (product) return new Promise((resolve, reject) => resolve());

        return Product.create({
          name: item.name,
          description: item.short_description,
          price: item.price,
          brand_name: item.brand_name,
          image: item.thumbnail_url,
          category: category._id,
          review_count: item.review_count,
          rating_average: item.rating_average,
        });
      })
    );

    return res.send("Thêm thành công");
  } catch (error) {
    return res.send(error.message);
  }
};

exports.getProduct = async (req, res) => {
  const { name } = req.body;

  try {
    const product = await Product.findOne({ name });

    return res.json(product);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

exports.getAllProduct = async (req, res) => {
  const products = await Product.find();

  return res.json({ products, count: products.length });
};

exports.getProductByCategory = async (req, res) => {
  const { categoryName } = req.query;

  try {
    const category = await Category.findOne({ name: categoryName });

    if (!category) throw new Error("Category không hợp lệ");

    const products = await Product.find({ category: category._id });

    if (!products) throw new Error("Không có sản phẩm nào");

    return res.json({ products, count: products.length });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const products = await Product.find();

    for (let product of products) {
      let result = [];
      let currentCategory = await Category.findById(product.category);
      if (!currentCategory) throw new Error("Có lỗi xảy ra");

      result.push(currentCategory._id);

      let parentCategory = await Category.findById(
        currentCategory.parentCategory
      );

      if (!parentCategory) throw new Error("Có lỗi xảy ra");

      result.push(parentCategory._id);

      if (parentCategory.parentCategory) {
        let upLevelParentCategory = await Category.findById(
          parentCategory.parentCategory
        );

        if (!upLevelParentCategory) throw new Error("Có lỗi xảy ra");

        result.push(upLevelParentCategory._id);
      }

      product.category = result;
      await product.save();
    }

    return res.send("Done");
  } catch (error) {
    return res.json(error.message);
  }
};

exports.updateRatingForProduct = async (req, res) => {
  try {
    const products = await Product.find();

    await Promise.all(
      products.map((product) => {
        const rating = 1 + Math.random() * 4;

        product.rating_average = rating;
        return product.save();
      })
    );

    return res.send("Done");
  } catch (error) {
    return res.send(error.message);
  }
};
