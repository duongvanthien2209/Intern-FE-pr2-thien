import { ADMIN_LOGIN } from "./authActionType";

export const adminLogin = (values) => {
  return {
    type: ADMIN_LOGIN,
    payload: values,
  };
};
