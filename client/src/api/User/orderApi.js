import axiosClient from "../apiClient";

import { baseURLUserOrder } from "../../constants";

export const addOrderApi = (formData) =>
  axiosClient.post(`${baseURLUserOrder}/addOrder`, formData);

export const getOrderApi = (orderId) =>
  axiosClient.get(`${baseURLUserOrder}/${orderId}`);

//  Lấy lịch sử thanh toán của người dùng
export const getAllOrderApi = () =>
  axiosClient.get(`${baseURLUserOrder}/orderHistory`);

// Hủy hóa đơn
export const cancelOrderApi = (orderId) =>
  axiosClient.get(`${baseURLUserOrder}/cancelOrder/${orderId}`);
