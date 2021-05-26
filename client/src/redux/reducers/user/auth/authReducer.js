import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  IS_LOGING,
  GET_ME,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_UPDATE_INFO_SUCCESS,
} from "../../../actions/user/auth/authActionType";

const initialState = {
  user: null,
  password: null,
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
        password: action.password,
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
    case USER_UPDATE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        password: action.password,
      };
    default:
      return state;
  }
};

export default reducer;
