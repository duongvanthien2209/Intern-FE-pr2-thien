import {
  CATEGORY__LOADING,
  CATEGORY_FAIL,
  CATEGORY__SUCCESS,
} from "redux/actions/user/category/categoryActionType";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY__SUCCESS:
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CATEGORY__LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
