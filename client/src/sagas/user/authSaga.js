import { USER_LOGIN } from "../../redux/actions/user/auth/authActionType";
import { call, put, takeEvery } from "redux-saga/effects";

import { loginApi } from "../../api/User/authApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "redux/actions/user/auth/authActionType";

function* fetchUserLogin(action) {
  try {
    const { status, error, data } = yield call(loginApi, action.payload);

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      yield put({ type: USER_LOGIN_SUCCESS, token: data.token });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: USER_LOGIN_FAIL, message: error.message });
  }
}

export function* watchUserLogin() {
  yield takeEvery(USER_LOGIN, fetchUserLogin);
}
