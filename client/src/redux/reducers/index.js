import { combineReducers } from "redux";

import userAuthReducer from "./user/auth/authReducer";

const rootReducer = combineReducers({
  // User
  "user/auth": userAuthReducer,

  // Admin
});

export default rootReducer;
