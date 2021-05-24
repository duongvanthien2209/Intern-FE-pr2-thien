import { all } from "redux-saga/effects";

import { watchUserLogin } from "./user/authSaga";
import { watchFetchCategory } from "./user/categorySaga";
import { watchFetchChangeCategory } from "./user/filterSaga";
import { watchFetchChangeProduct } from "./user/productSaga";

export default function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchFetchCategory(),
    watchFetchChangeCategory(),
    watchFetchChangeProduct(),
  ]);
}
