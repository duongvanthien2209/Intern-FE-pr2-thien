import { combineReducers } from "redux";

import userAuthReducer from "./user/auth/authReducer";
import userCategoryReducer from "./user/categoryReducer";
import userFilterReducer from "./user/filterReducer";
import userProductReducer from "./user/productReducer";

const rootReducer = combineReducers({
  // User
  "user/auth": userAuthReducer,
  "user/category": userCategoryReducer,
  "user/filter": userFilterReducer,
  "user/product": userProductReducer,

  // Admin
});

export default rootReducer;
