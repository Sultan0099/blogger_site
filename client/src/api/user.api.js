import axios from "axios";

import * as key from "../config/key";
import * as actions from "../actions/user";

const userLogin = (userData, props) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`${key.http}/api/user/signin`, {
        ...userData
      });
      console.log("response", res);
      console.log("state", getState);
      dispatch({ type: actions.USER_LOGIN, payload: res.data });
    } catch (error) {
      const data = error.response.data;
      dispatch({ type: actions.USER_ERROR, payload: data });
    }
  };
};

const userSignUp = userData => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`${key.http}/api/user/signup`, {
        ...userData
      });
      console.log("signup response", res);
    } catch (error) {
      const data = error.response.data;
      console.log(error);

      if (data.errorMsg.code) {
        data.errorMsg = { msg: "Please check your internet connection" };
      }
      console.log("error data", data);

      Object.keys(data.errorMsg).forEach(key =>
        console.log(data.errorMsg[key])
      );

      dispatch({ type: actions.USER_ERROR, payload: data });
    }
  };
};
export { userLogin, userSignUp };
