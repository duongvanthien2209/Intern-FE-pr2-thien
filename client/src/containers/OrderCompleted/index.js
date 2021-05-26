import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";

import moment from "moment";

// Apis
import { getOrderApi } from "api/User/orderApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

const OrderCompleted = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { status, error, data } = await getOrderApi(orderId);

      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        setOrder(() => data.order);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    order && (
      <div className="order">
        <h1>Bạn đã đặt hàng thành công</h1>
        <h2>Thông tin hóa đơn</h2>
        <p>
          <span className="font-weight-bold">Người nhận:</span>
          {` ${order.fullname}`}
        </p>
        <p>
          <span className="font-weight-bold">Số điện thoại:</span>
          {` ${order.phone}`}
        </p>
        <p>
          <span className="font-weight-bold">Địa chỉ:</span>
          {` ${order.address}`}
        </p>
        <p>
          <span className="font-weight-bold">Tổng số tiền:</span>
          {` ${order.total}`}
        </p>
        <p>
          <span className="font-weight-bold">Tổng tạo:</span>
          {` ${moment(order.dateCreate).format("DD/MM/YYYY")}`}
        </p>
        <p>
          <span className="font-weight-bold">Trạng thái:</span>
          {` ${order.status}`}
        </p>
      </div>
    )
  );
};

export default OrderCompleted;
