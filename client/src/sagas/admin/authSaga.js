import { call, put, takeEvery } from "redux-saga/effects";

// Apis
import { loginApi } from "api/Admin/authApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
} from "redux/actions/admin/auth/authActionType";

function* fetchAdminLogin(action) {
  try {
    const { status, error, data } = yield call(loginApi, action.payload);

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { token } = data;
      yield put({ type: ADMIN_LOGIN_SUCCESS, token });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: ADMIN_LOGIN_FAIL, message: error.message });
  }
}

export function* watchAdminLogin() {
  yield takeEvery(ADMIN_LOGIN, fetchAdminLogin);
}
