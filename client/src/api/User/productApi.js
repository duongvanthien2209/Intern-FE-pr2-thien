import axiosClient from "../apiClient";

import { baseURLUserProduct } from "constants/index";

// Lấy dữ liệu Filter
export const getFilterByCategory = (categoryId) =>
  axiosClient.get(`${baseURLUserProduct}/getByCategory/${categoryId}`);

export const filterProduct = (categoryId, queryString) =>
  axiosClient.get(
    `${baseURLUserProduct}/getByFilter/${categoryId}?${queryString}`
  );
