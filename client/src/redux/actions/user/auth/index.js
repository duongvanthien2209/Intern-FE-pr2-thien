import {
  USER_LOGIN,
  GET_ME,
  USER_CHANGE_PASSWORD,
  USER_UPDATE_INFO,
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

export const userUpdateInfo = (data) => {
  return {
    type: USER_UPDATE_INFO,
    payload: data,
  };
};

export const userChangePassword = (data) => {
  return {
    type: USER_CHANGE_PASSWORD,
    payload: data,
  };
};
