import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "./authActionType";

export const userLogin = () => {
  return {
    type: USER_LOGIN,
  };
};
