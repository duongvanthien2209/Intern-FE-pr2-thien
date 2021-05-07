import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "reactstrap";

import moment from "moment";

// Apis
import { getAllApi, updateStatusApi } from "api/Admin/orderApi";
import { deleteOrderDetailApi } from "api/Admin/orderDetailApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";
import OrderManagerTable from "components/Admin/OrderManager/OrderManagerTable";
import OrderManagerForm from "components/Admin/OrderManager/OrderManagerForm";

const OrderManager = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({
    date: { from: "", to: moment(new Date()).format("YYYY-MM-DD") },
    desc: 1,
  });

  useEffect(() => {
    fetchData();
  }, [page, filter]);

  const fetchData = async () => {
    try {
      const { status, error, data } = await getAllApi(filter, page);
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { orders: currentOrders, total: currentTotal } = data;

        setOrders(() => currentOrders);

        if (total === 0) setTotal(() => currentTotal);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleChangeStatus = (orderId) => async (evt) => {
    try {
      const { status, error, data } = await updateStatusApi(orderId, {
        status: evt.target.value,
      });
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { message } = data;

        const index = orders.findIndex((item) => item._id === orderId);
        if (index >= 0) {
          setOrders(() => [
            ...orders.slice(0, index).map((item) => ({ ...item })),
            { ...orders[index], status: evt.target.value },
            ...orders.slice(index + 1).map((item) => ({ ...item })),
          ]);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleDeleteOrderDetail = async (orderDetailId, orderId) => {
    try {
      const { status, error, data } = await deleteOrderDetailApi(orderDetailId);
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { message } = data;

        const index = orders.findIndex((item) => item._id === orderId);
        const orderDetailIndex = orders[index].orderDetails.findIndex(
          (item) => item._id === orderDetailId
        );

        if (index >= 0 && orderDetailIndex >= 0) {
          setOrders(() => [
            ...orders.slice(0, index).map((item) => ({ ...item })),
            {
              ...orders[index],
              orderDetails: [
                ...orders[index].orderDetails
                  .slice(0, orderDetailIndex)
                  .map((item) => ({ ...item })),
                ...orders[index].orderDetails
                  .slice(orderDetailIndex + 1)
                  .map((item) => ({ ...item })),
              ],
            },
            ...orders.slice(index + 1).map((item) => ({ ...item })),
          ]);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleSubmitDate = (values) => {
    setFilter(() => ({ ...filter, date: { ...values } }));
  };

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý hóa đơn</h1>
      <OrderManagerForm
        initialValues={{ from: filter.date.from, to: filter.date.to }}
        onSubmit={handleSubmitDate}
      />
      <OrderManagerTable
        orders={orders}
        onChangeStatus={handleChangeStatus}
        onDeleteOrderDetail={handleDeleteOrderDetail}
      />
    </div>
  );
};

export default OrderManager;
