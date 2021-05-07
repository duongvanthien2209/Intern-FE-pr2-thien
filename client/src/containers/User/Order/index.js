import OrderPersonForm from "components/User/Order/OrderPersonForm";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Table } from "reactstrap";

// Apis
import { addOrderApi } from "api/User/orderApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";
import { Redirect } from "react-router";

// Actions
import { clearCartItem } from "redux/actions/user/cart";

const Order = () => {
  const { user } = useSelector((state) => state["user/auth"]);
  const { cart } = useSelector((state) => state["user/cart"]);

  const [orderId, setOrderId] = useState(null);

  const dispatch = useDispatch();

  const initialValues = {
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    payMethod: 0,
  };

  const payMethodOptions = [
    { id: 1, text: "Thanh toán khi nhận hàng" },
    { id: 2, text: "Thanh toán bằng thẻ ngân hàng" },
  ];

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      const payMethod = payMethodOptions.find(
        (item) => item.id === values.payMethod
      );

      const { status, error, data } = await addOrderApi({
        ...values,
        payMethod: payMethod.text,
        cart: cart.map((item) => ({ _id: item._id, total: item.total })),
      });

      // debugger;
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { orderId: currentOrderId } = data;
        dispatch(clearCartItem());
        setOrderId(() => currentOrderId);
      }

      return;
    } catch (error) {
      return console.log(error);
    }
  };

  const total = cart.reduce(
    (item1, item2) => item1 + item2.total * item2.price,
    0
  );

  return orderId ? (
    <Redirect to={{ pathname: `/main/orderCompleted/${orderId}` }} />
  ) : (
    <div className="order">
      <Container>
        <Row>
          <Col lg="6">
            <h2>Thông tin người nhận</h2>
            <OrderPersonForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              payMethodOptions={payMethodOptions}
            />
          </Col>
          <Col lg="6">
            <h3>Chi tiết giỏ hàng</h3>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.total}</td>
                    <td>{item.total * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>
              <span className="font-weight-bold text-danger">Tổng tiền:</span>
              {` ${total} VNĐ`}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Order;
