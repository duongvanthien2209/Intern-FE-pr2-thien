import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
} from "redux/actions/admin/auth/authActionType";

const initialState = {
  isLogined: false,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("token", action.token);

      return {
        ...state,
        isLogined: true,
        loading: false,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
