import axiosClient from "../apiClient";

import { baseURLAdminOrder } from "constants/index";

export const getAllApi = (filter, page) => {
  const {
    date: { from, to },
    desc,
  } = filter;

  let queryString = `${baseURLAdminOrder}/getAll?page=${page}&desc=${desc}&date[from]=${from}&date[to]=${to}`;

  return axiosClient.get(queryString);
};

export const updateStatusApi = (orderId, data) =>
  axiosClient.post(`${baseURLAdminOrder}/updateStatus/${orderId}`, data);
