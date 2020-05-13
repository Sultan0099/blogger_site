import * as actions from "../actions/user";

const initialState = {
  user: null,
  authenticate: false,
  token: null,
  error: false,
  errorMsg: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticate: true,
        error: false,
        errorMsg: null,
      };
    case action.USER_SIGNUP:
      return {
        ...state,
        user: action.payload,
        authentication: true,
        error: false,
      };
    case actions.USER_ERROR:
      return {
        ...state,
        user: null,
        authenticate: false,
        token: null,
        error: true,
        errorMsg: action.payload,
      };
  }

  return state;
};

export default userReducer;
