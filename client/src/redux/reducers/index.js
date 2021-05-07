import { combineReducers } from "redux";

import userAuthReducer from "./user/auth/authReducer";
import userCategoryReducer from "./user/categoryReducer";

const rootReducer = combineReducers({
  // User
  "user/auth": userAuthReducer,
  "user/category": userCategoryReducer,

  // Admin
});

export default rootReducer;
