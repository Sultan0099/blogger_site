import * as actions from "../actions/user";

const initialState = {
  user: null,
  authenticate: false,
  token: null,
  error: false,
  errorMsg: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticate: true,
        token: action.payload.token,
        error: false
      };
    case action.USER_SIGNUP:
      return {
        ...state,
        user: action.payload,
        authentication: true,
        token: action.payload.token,
        error: false
      };
    case actions.USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        errorMsg: action.payload.errorMsg
      };
  }

  return state;
};

export default userReducer;
