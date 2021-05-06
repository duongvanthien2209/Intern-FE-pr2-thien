import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  IS_LOGING,
} from "../../../actions/user/auth/authActionType";

const initialState = {
  token: localStorage.getItem("userAuthToken"),
  isLogined: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLogined: true,
        loading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case IS_LOGING:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
