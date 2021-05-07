import axiosClient from "../apiClient";

import { baseURLAdminOrderDetail } from "constants/index";

export const deleteOrderDetailApi = (orderDetailId) =>
  axiosClient.get(`${baseURLAdminOrderDetail}/delete/${orderDetailId}`);
