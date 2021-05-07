import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CHANGE_CART_ITEM,
} from "redux/actions/user/cart/cartActionType";

export const addCartItem = (cart) => ({
  type: ADD_CART_ITEM,
  payload: cart,
});

export const removeCartItem = (cartId) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: cartId,
  };
};

export const changeCartItem = (cart) => ({
  type: CHANGE_CART_ITEM,
  payload: cart,
});
