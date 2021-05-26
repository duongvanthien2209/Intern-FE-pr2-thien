import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  IS_LOGING,
  GET_ME,
} from "../../../actions/user/auth/authActionType";

const initialState = {
  user: null,
  isLogined: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.token);

      return {
        ...state,
        user: action.user,
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
    case GET_ME:
      return {
        ...state,
        user: action.payload,
        isLogined: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
