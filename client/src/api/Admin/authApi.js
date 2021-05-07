import axiosClient from "../apiClient";

import { baseURLAdminAuth } from "constants/index";

export const loginApi = (data) =>
  axiosClient.post(`${baseURLAdminAuth}/login`, data);
