import {
  ADD_CHANGE_CATEGORY_SUCCESS,
  ADD_CHANGE_CATEGORY_FAIL,
  ADD_CHANGE_RATING,
  ADD_CHANGE_PRICE,
  ADD_CHANGE_BRAND,
  ADD_CHANGE_PAGE,
} from "redux/actions/user/filter/filterActionType";

const initialState = {
  isLoading: false,
  error: null,

  currentCategory: null,
  childCategories: [],
  filter: {
    rating: 0,
    // brands: [{ name: '', status: false }]
    brands: [],
    price: {
      current: { from: 0, to: 0 },
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
          rating: 0,
          brands,
          price: {
            current: { from: 0, to: 0 },
            data: price,
          },
          page: 1,
        },
      };
    case ADD_CHANGE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case ADD_CHANGE_RATING:
      return {
        ...state,
        filter: {
          ...state.filter,
          rating: action.payload,
        },
      };
    case ADD_CHANGE_PRICE:
      return {
        ...state,
        filter: {
          ...state.filter,
          price: {
            ...state.filter.price,
            current: action.payload,
          },
        },
      };
    case ADD_CHANGE_BRAND:
      // debugger;
      const index = state.filter.brands.findIndex(
        (brand) => brand.name === action.payload
      );

      if (index >= 0)
        return {
          ...state,
          filter: {
            ...state.filter,
            brands: [
              ...state.filter.brands
                .slice(0, index)
                .map((brand) => ({ ...brand })),
              {
                ...state.filter.brands[index],
                status: !state.filter.brands[index].status,
              },
              ...state.filter.brands
                .slice(index + 1)
                .map((brand) => ({ ...brand })),
            ],
          },
        };
    case ADD_CHANGE_PAGE:
      // debugger;
      return {
        ...state,
        filter: {
          ...state.filter,
          page: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
