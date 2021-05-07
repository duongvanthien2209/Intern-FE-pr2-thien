import axiosClient from "../apiClient";

import { baseURLUserOrder } from "../../constants";

export const addOrderApi = (formData) =>
  axiosClient.post(`${baseURLUserOrder}/addOrder`, formData);

export const getOrderApi = (orderId) =>
  axiosClient.get(`${baseURLUserOrder}/${orderId}`);
