import { call, put, takeEvery } from "@redux-saga/core/effects";

// Apis
import { filterProduct } from "api/User/productApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  CHANGE_PRODUCT,
  CHANGE_PRODUCT_SUCCESS,
  CHANGE_PRODUCT_FAIL,
} from "redux/actions/user/product/productActionType";

function* fetchChangeProduct(action) {
  try {
    // debugger;
    const { status, error, data } = yield call(
      filterProduct,
      action.currentCategoryId,
      action.filter
    );

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { products, total } = data;

      yield put({ type: CHANGE_PRODUCT_SUCCESS, products, total });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: CHANGE_PRODUCT_FAIL, message: error.message });
  }
}

export function* watchFetchChangeProduct() {
  yield takeEvery(CHANGE_PRODUCT, fetchChangeProduct);
}
