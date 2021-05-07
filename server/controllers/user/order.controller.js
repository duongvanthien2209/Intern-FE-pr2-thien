// Models
const Response = require("../../helpers/response.helper");
const Order = require("../../models/Order.model");
const OrderDetail = require("../../models/OrderDetail.model");
const Product = require("../../models/Product.model");

exports.cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    if (!orderId) throw new Error("Có lỗi xảy ra");

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Có lỗi xảy ra");

    order.status = "Đã hủy";

    await order.save();

    return Response.success(res, { message: "Đã hủy thành công" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  const { user } = req;

  try {
    if (!user) throw new Error("Có lỗi xảy ra");

    const orders = await Order.find({ user: user._id }).sort({
      dateCreate: -1,
    });

    if (!orders) throw new Error("Có lỗi xảy ra");

    let parentResult = [];
    for (let order of orders) {
      const orderDetails = await OrderDetail.find({
        order: order._id,
      }).populate("product");

      if (!orderDetails) throw new Error("Có lỗi xảy ra");

      parentResult.push({
        _id: order._id,
        dateCreate: order.dateCreate,
        total: order.total,
        status: order.status,
        orderDetails,
      });
    }

    return Response.success(res, { orders: parentResult });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    if (!orderId) throw new Error("Có lỗi xảy ra");

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order Id không hợp lệ");

    return Response.success(res, { order });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.addOrder = async (req, res, next) => {
  // Cart: [{ _id, total }]
  const {
    user,
    body: { fullname, phone, address, payMethod, cart },
  } = req;

  try {
    if (!fullname || !phone || !address || !payMethod || !cart || !user)
      throw new Error("Có lỗi xảy ra");

    const order = await Order.create({
      fullname,
      phone,
      address,
      payMethod,
      user: user._id,
    });

    // cart = JSON.parse(cart);

    let total = 0;

    for (let cartItem of cart) {
      const product = await Product.findById(cartItem._id);

      if (!product) throw new Error("Có lỗi xảy ra");

      total += cartItem.total * product.price;

      await OrderDetail.create({
        order: order._id,
        product: product._id,
        total: cartItem.total,
      });
    }

    order.total = total;

    await order.save();

    return Response.success(res, { orderId: order.id });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
