import React, { useState } from "react";

import moment from "moment";
import {
  Button,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { statusOptions } from "constants/index";

const OrderManagerTable = ({ orders, onChangeStatus, onDeleteOrderDetail }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [order, setOrder] = useState(null);

  const handleSetOrder = (currentOrder) => {
    console.log(currentOrder);
    setOrder(() => currentOrder);
    setModal(() => true);
  };

  const handleDeleteOrderDetail = (orderDetailId) => {
    const index = order.orderDetails.findIndex(
      (item) => item._id === orderDetailId
    );
    if (index >= 0) {
      setOrder(() => ({
        ...order,
        orderDetails: [
          ...order.orderDetails.slice(0, index).map((item) => ({ ...item })),
          ...order.orderDetails.slice(index + 1).map((item) => ({ ...item })),
        ],
      }));
      onDeleteOrderDetail(orderDetailId, order._id);
    }
  };

  console.log(order);

  return (
    <Table bordered>
      {order && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết hóa đơn</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Xóa</th>
                </tr>
              </thead>

              <tbody>
                {order.orderDetails.length > 0 &&
                  order.orderDetails.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <th>{item.product.name}</th>
                      <th>{item.total}</th>
                      <th>{item.product.price}</th>
                      <th>
                        <Button
                          color="danger"
                          block
                          onClick={() => handleDeleteOrderDetail(item._id)}
                        >
                          Xóa
                        </Button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      )}

      <thead>
        <tr>
          <th>#</th>
          <th>Tên người nhận</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Ngày lập</th>
          <th>Trạng thái</th>
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.fullname}</td>
            <td>{order.phone}</td>
            <td>{order.address}</td>
            <td>
              {moment(new Date(order.dateCreate.toString())).format(
                "DD/MM/YYYY"
              )}
            </td>
            <td>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                disabled={order.status === "Đã hủy"}
                onChange={onChangeStatus(order._id)}
              >
                {statusOptions.map((item) => (
                  <option value={item} selected={item === order.status}>
                    {item}
                  </option>
                ))}
              </Input>
            </td>
            <td>
              <Button
                block
                color="success"
                onClick={() => handleSetOrder(order)}
              >
                Xem
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderManagerTable;
