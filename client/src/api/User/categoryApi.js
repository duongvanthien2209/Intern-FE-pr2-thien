import axiosClient from "../apiClient";

import { baseURLUserCategory } from "../../constants";

export const getAllApi = () => axiosClient.get(baseURLUserCategory);
