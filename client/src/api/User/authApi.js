import axiosClient from "../apiClient";

import { baseURLUserAuth } from "../../constants";

export const registerApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/register`, data);

export const loginApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/login`, data);

export const getMeApi = () => axiosClient.get(`${baseURLUserAuth}/getMe`);
