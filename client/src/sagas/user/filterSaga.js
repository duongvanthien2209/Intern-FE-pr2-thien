import { call, put, takeEvery } from "@redux-saga/core/effects";

// Apis
import { getChildCategory } from "api/User/categoryApi";
import { getFilterByCategory } from "api/User/productApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  ADD_CHANGE_CATEGORY,
  ADD_CHANGE_CATEGORY_SUCCESS,
  ADD_CHANGE_CATEGORY_FAIL,
} from "redux/actions/user/filter/filterActionType";

function* fetchChangeCategory(action) {
  try {
    // debugger;
    const { status, error, data } = yield call(
      getChildCategory,
      action.payload
    );

    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      const { childCategories } = data;

      const {
        status: currentStatus,
        error: currentError,
        data: currentData,
      } = yield call(getFilterByCategory, action.payload);

      if (currentStatus === RESPONSE_STATUS_FAILED && currentError)
        throw new Error(error.message);

      if (currentStatus === RESPONSE_STATUS_SUCCESS && currentData) {
        const { brands, price, currentCategory } = currentData;

        yield put({
          type: ADD_CHANGE_CATEGORY_SUCCESS,
          currentCategory,
          brands: brands.map((brand) => ({ name: brand, status: false })),
          price,
          childCategories,
        });
      }
    }
  } catch (error) {
    console.log(error);

    return yield put({
      type: ADD_CHANGE_CATEGORY_FAIL,
      message: error.message,
    });
  }
}

export function* watchFetchChangeCategory() {
  yield takeEvery(ADD_CHANGE_CATEGORY, fetchChangeCategory);
}
