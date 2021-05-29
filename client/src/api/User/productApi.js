import axiosClient from "../apiClient";

import { baseURLUserProduct } from "constants/index";

// Lấy dữ liệu Filter
export const getFilterByCategory = (categoryId) =>
  axiosClient.get(`${baseURLUserProduct}/getByCategory/${categoryId}`);

export const filterProduct = (categoryId, filter) => {
  // debugger;
  const { rating, brands, price, page } = filter;

  let queryString = `${baseURLUserProduct}/getByFilter/${categoryId}?page=${page}`;

  if (rating > 0) queryString += `&rating=${rating}`;

  if (brands.length > 0)
    brands.forEach((element) => {
      if (element.status) queryString += `&brands=${element.name}`;
    });

  if (price.current.from > 0 || price.current.to > 0)
    queryString += `&price[from]=${price.current.from}&price[to]=${price.current.to}`;

  // debugger;
  return axiosClient.get(queryString);
};

export const getProduct = (productId) =>
  axiosClient.get(`${baseURLUserProduct}/${productId}`);
