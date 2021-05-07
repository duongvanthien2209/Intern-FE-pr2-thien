import axiosClient from "../apiClient";

import { baseURLUserAuth } from "../../constants";

export const registerApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/register`, data);

export const loginApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/login`, data);

export const getMeApi = () => axiosClient.get(`${baseURLUserAuth}/getMe`);

export const updateInfoApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/updateInfo`, data);

export const changePasswordApi = (data) =>
  axiosClient.post(`${baseURLUserAuth}/changePassword`, data);
