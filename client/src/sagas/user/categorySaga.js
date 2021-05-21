import { call, put, takeEvery } from "redux-saga/effects";

// Apis
import { getAllApi } from "api/User/categoryApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Action Type
import {
  CATEGORY__SUCCESS,
  CATEGORY_FAIL,
  FETCH_CATEGORY,
} from "redux/actions/user/category/categoryActionType";

function* fetchCatgegory() {
  try {
    const { status, error, data } = yield call(getAllApi);

    // debugger;
    if (status === RESPONSE_STATUS_FAILED && error)
      throw new Error(error.message);

    if (status === RESPONSE_STATUS_SUCCESS && data) {
      yield put({ type: CATEGORY__SUCCESS, categories: data.categories });
    }
  } catch (error) {
    console.log(error);

    yield put({ type: CATEGORY_FAIL, message: error.message });
  }
}

export function* watchFetchCategory() {
  yield takeEvery(FETCH_CATEGORY, fetchCatgegory);
}
