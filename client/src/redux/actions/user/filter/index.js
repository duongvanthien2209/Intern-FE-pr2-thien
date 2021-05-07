import {
  ADD_CHANGE_CATEGORY,
  ADD_CHANGE_RATING,
  ADD_CHANGE_PRICE,
  ADD_CHANGE_BRAND,
  ADD_CHANGE_PAGE,
} from "redux/actions/user/filter/filterActionType";

export const changeCategory = (category) => ({
  type: ADD_CHANGE_CATEGORY,
  payload: category,
});

export const changeRating = (rating) => ({
  type: ADD_CHANGE_RATING,
  payload: rating,
});

export const changePrice = (price) => ({
  type: ADD_CHANGE_PRICE,
  payload: price,
});

export const changeBrand = (brand) => ({
  type: ADD_CHANGE_BRAND,
  payload: brand,
});

export const changePage = (page) => ({
  type: ADD_CHANGE_PAGE,
  payload: page,
});
