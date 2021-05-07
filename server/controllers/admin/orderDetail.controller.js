const OrderDetail = require("../../models/OrderDetail.model");

const Response = require("../../helpers/response.helper");

exports.deleteProduct = async (req, res, next) => {
  const { orderDetailId } = req.params;

  try {
    const orderDetail = await OrderDetail.findById(orderDetailId);

    if (!orderDetail) throw new Error("Có lỗi xảy ra");

    await OrderDetail.findByIdAndRemove(orderDetailId);

    return Response.success(res, { message: "Đã xóa thành công" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
