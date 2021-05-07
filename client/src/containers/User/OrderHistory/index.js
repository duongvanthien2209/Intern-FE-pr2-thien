import React, { useEffect, useState } from "react";
import moment from "moment";

// Apis
import { getAllOrderApi, cancelOrderApi } from "api/User/orderApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";
import { Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { status, error, data } = await getAllOrderApi();

      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        if (data.orders) {
          setOrders(() => data.orders);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const toggle = () => {
    setIsOpen(() => !isOpen);
  };

  const handleSetOrder = (currentOrder) => {
    setOrder(() => currentOrder);
    setIsOpen(() => true);
  };

  const handleCancelButton = async (orderId) => {
    try {
      const { status, error, data } = await cancelOrderApi(orderId);

      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const index = orders.findIndex((item) => item._id === orderId);
        if (index >= 0) {
          setOrders(() => [
            ...orders.slice(0, index).map((item) => ({ ...item })),
            { ...orders[index], status: "Đã hủy" },
            ...orders.slice(index + 1).map((item) => ({ ...item })),
          ]);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="order-history">
      <h2>Lịch sử hóa đơn</h2>
      {orders.length > 0 && (
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Mã hóa đơn</th>
              <th>Ngày lập</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
              <th>Hủy</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((currentOrder, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{currentOrder._id}</td>
                <td>{moment(currentOrder.dateCreate).format("DD/MM/YYYY")}</td>
                <td>{currentOrder.status}</td>
                <td>{`${currentOrder.total} VNĐ`}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => handleSetOrder(currentOrder)}
                  >
                    Xem chi tiết
                  </Button>
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => handleCancelButton(currentOrder._id)}
                    disabled={currentOrder.status !== "Đang xử lý"}
                  >
                    Hủy
                  </Button>
                </td>
                {order && (
                  <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Chi tiết hóa đơn</ModalHeader>
                    <ModalBody>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderDetails.length > 0 &&
                            order.orderDetails.map((orderDetail, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{orderDetail.product.name}</td>
                                <td>{orderDetail.total}</td>
                                <td>
                                  {orderDetail.total *
                                    orderDetail.product.price}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </ModalBody>
                  </Modal>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderHistory;
