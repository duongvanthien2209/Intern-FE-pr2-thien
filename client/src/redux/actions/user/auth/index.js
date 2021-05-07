import {
  USER_LOGIN,
  // USER_LOGIN_SUCCESS,
  // USER_LOGIN_FAIL,
} from "./authActionType";

export const userLogin = (data) => {
  // debugger;
  return {
    type: USER_LOGIN,
    payload: data,
  };
};
