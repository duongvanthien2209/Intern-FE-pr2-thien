import { combineReducers } from "redux";

import userAuthReducer from "./user/auth/authReducer";
import userCategoryReducer from "./user/categoryReducer";
import userFilterReducer from "./user/filterReducer";

const rootReducer = combineReducers({
  // User
  "user/auth": userAuthReducer,
  "user/category": userCategoryReducer,
  "user/filter": userFilterReducer,

  // Admin
});

export default rootReducer;
