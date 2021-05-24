import { ADD_CHANGE_CATEGORY } from "redux/actions/user/filter/filterActionType";

export const changeCategory = (category) => ({
  type: ADD_CHANGE_CATEGORY,
  payload: category,
});
