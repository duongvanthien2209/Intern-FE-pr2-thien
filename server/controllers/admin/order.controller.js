const Order = require("../../models/Order.model");
const OrderDetail = require("../../models/OrderDetail.model");

const { limit } = require("../../constants");

const Response = require("../../helpers/response.helper");

exports.getAll = async (req, res, next) => {
  // dec = 1 : tăng, = -1 giảm
  const {
    date: { from = "", to = "" },
    desc = 1,
    page = 1,
  } = req.query;

  try {
    let orders;

    if (from && to) {
      const datePartsFrom = from.split("-");
      const datePartsTo = to.split("-");

      orders = await Order.find({
        dateCreate: {
          $gte: new Date(
            parseInt(datePartsFrom[0], 10),
            parseInt(datePartsFrom[1], 10) - 1,
            parseInt(datePartsFrom[2], 10)
          ),
          $lte: new Date(
            parseInt(datePartsTo[0], 10),
            parseInt(datePartsTo[1], 10) - 1,
            parseInt(datePartsTo[2], 10)
          ),
        },
      })
        .sort({
          total: parseInt(desc),
        })
        .skip((parseInt(page) - 1) * limit)
        .limit(limit);
    } else
      orders = await Order.find()
        .sort({
          total: parseInt(desc),
        })
        .skip((parseInt(page) - 1) * limit)
        .limit(limit);

    if (!orders) throw new Error("Có lỗi xảy ra");

    let parentResult = [];
    for (let order of orders) {
      const orderDetails = await OrderDetail.find({
        order: order._id,
      }).populate("product");

      if (!orderDetails) throw new Error("Có lỗi xảy ra");

      parentResult.push({
        ...order._doc,
        orderDetails,
      });
    }

    const total = await Order.find().count();

    return Response.success(res, { orders: parentResult, total });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  const {
    params: { orderId },
    body: { status },
  } = req;

  try {
    if (!orderId || !status) throw new Error("Có lỗi xảy ra");

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order ID không hợp lệ");

    await Order.findByIdAndUpdate(orderId, { $set: { status } });

    return Response.success(res, { message: "Cập nhật thành công" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
