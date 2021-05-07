import { CHANGE_PRODUCT } from "./productActionType";

export const changeProduct = (filter, currentCategoryId) => {
  // debugger;
  return {
    type: CHANGE_PRODUCT,
    filter,
    currentCategoryId,
  };
};
