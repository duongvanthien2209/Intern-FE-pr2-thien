export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const IS_LOGING = "IS_LOGING";

export const userLogin = (data) => ({
  type: USER_LOGIN,
  payload: data,
});
