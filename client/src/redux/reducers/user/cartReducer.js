import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CHANGE_CART_ITEM,
} from "redux/actions/user/cart/cartActionType";

const initialState = {
  // [{ _id:, name:, image: ,total: }]
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM: {
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (index >= 0) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index).map((item) => ({ ...item })),
            {
              ...state.cart[index],
              total: state.cart[index].total + action.payload.total,
            },
            ...state.cart.slice(index + 1).map((item) => ({ ...item })),
          ],
        };
      }

      return {
        ...state,
        cart: [...state.cart.map((item) => ({ ...item })), action.payload],
      };
    }
    case REMOVE_CART_ITEM: {
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload
      );

      if (index >= 0) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index).map((item) => ({ ...item })),
            ...state.cart.slice(index + 1).map((item) => ({ ...item })),
          ],
        };
      }

      return;
    }
    case CHANGE_CART_ITEM: {
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (index >= 0) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index).map((item) => ({ ...item })),
            {
              ...state.cart[index],
              total: action.payload.total,
            },
            ...state.cart.slice(index + 1).map((item) => ({ ...item })),
          ],
        };
      }
    }
    default:
      return state;
  }
};

export default reducer;
