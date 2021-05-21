import { all } from "redux-saga/effects";

import { watchUserLogin } from "./user/authSaga";
import { watchFetchCategory } from "./user/categorySaga";

export default function* rootSaga() {
  yield all([watchUserLogin(), watchFetchCategory()]);
}
