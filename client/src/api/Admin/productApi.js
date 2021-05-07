import axiosClient from "../apiClient";

import { baseURLAdminProduct } from "constants/index";

export const deleteProductApi = (productId) =>
  axiosClient.get(`${baseURLAdminProduct}/delete/${productId}`);

export const updateProductApi = (productId, formData) =>
  axiosClient.post(`${baseURLAdminProduct}/update/${productId}`, formData);
