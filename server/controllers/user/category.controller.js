// Models
const Category = require("../../models/Category.model");

const Response = require("../../helpers/response.helper");

exports.getAll = async (req, res, next) => {
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
            id: childCategory._id,
          }));

          if (childChildResult.length > 0) {
            childResult.push({
              name: childCategory.name,
              id: childCategory._id,
              childs: childChildResult,
            });
          } else
            childResult.push({
              name: childCategory.name,
              id: childCategory._id,
            });
        }

        if (childResult.length > 0) {
          result.push({
            name: category.name,
            id: category._id,
            childs: childResult,
          });
        }
      }
    }

    return Response.success(res, { categories: result });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
