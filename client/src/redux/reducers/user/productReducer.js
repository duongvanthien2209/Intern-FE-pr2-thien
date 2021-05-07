import {
  CHANGE_PRODUCT_SUCCESS,
  CHANGE_PRODUCT_FAIL,
} from "redux/actions/user/product/productActionType";

const initialState = {
  products: [],
  total: 0,
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.products,
        total: action.total,
      };
    case CHANGE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
