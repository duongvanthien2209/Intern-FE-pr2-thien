import { all } from "redux-saga/effects";

import { watchUserLogin } from "./user/authSaga";

export default function* rootSaga() {
  yield all([watchUserLogin]);
}
