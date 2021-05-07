import { USER_LOGIN } from "../../redux/actions/user/auth/authActionType";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  loginApi,
  getMeApi,
  updateInfoApi,
  changePasswordApi,
} from "../../api/User/authApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_INFO,
  USER_CHANGE_PASSWORD,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_UPDATE_INFO_SUCCESS,
} from "redux/actions/user/auth/authActionType";

function* fetchUserLogin(action) {
  try {
    const { status, error, data } = yield call(loginApi, action.payload);

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { token, user, password } = data;
      yield put({ type: USER_LOGIN_SUCCESS, token, user, password });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: USER_LOGIN_FAIL, message: error.message });
  }
}

function* fetchUserUpdateInfo(action) {
  try {
    const { status, error, data } = yield call(updateInfoApi, action.payload);

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { user } = data;
      yield put({ type: USER_UPDATE_INFO_SUCCESS, user });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: USER_LOGIN_FAIL, message: error.message });
  }
}

function* fetchUserChangePassword(action) {
  try {
    const { status, error, data } = yield call(
      changePasswordApi,
      action.payload
    );

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { user, password } = data;

      yield put({ type: USER_CHANGE_PASSWORD_SUCCESS, user, password });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: USER_LOGIN_FAIL, message: error.message });
  }
}

export function* watchUserLogin() {
  yield takeEvery(USER_LOGIN, fetchUserLogin);
}

export function* watchUserUpdateInfo() {
  yield takeEvery(USER_UPDATE_INFO, fetchUserUpdateInfo);
}

export function* watchUserChangePassword() {
  yield takeEvery(USER_CHANGE_PASSWORD, fetchUserChangePassword);
}
