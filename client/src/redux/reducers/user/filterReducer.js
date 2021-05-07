import {
  ADD_CHANGE_CATEGORY_SUCCESS,
  ADD_CHANGE_CATEGORY_FAIL,
} from "redux/actions/user/filter/filterActionType";

const initialState = {
  isLoading: false,
  error: null,

  currentCategory: null,
  childCategories: [],
  filter: {
    rating: 0,
    brands: [],
    price: {
      curren: { from: 0, to: 0 },
      data: [],
    },
    page: 1,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANGE_CATEGORY_SUCCESS:
      const { currentCategory, brands, price, childCategories } = action;

      return {
        ...state,
        isLoading: false,
        currentCategory,
        childCategories,
        filter: {
          ...state.filter,
          brands,
          price: {
            curren: { from: 0, to: 0 },
            data: price,
          },
        },
      };
    case ADD_CHANGE_CATEGORY_FAIL:
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
