import { USER_LOGIN } from "../../redux/actions/user/auth/authActionType";
import { takeEvery } from "redux-saga/effects";

function* fetchUserLogin(action) {}

export function* watchUserLogin() {
  yield takeEvery(USER_LOGIN, fetchUserLogin);
}
