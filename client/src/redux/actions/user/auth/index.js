import {
  USER_LOGIN,
  GET_ME,
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

export const getMe = (user) => {
  return {
    type: GET_ME,
    payload: user,
  };
};
