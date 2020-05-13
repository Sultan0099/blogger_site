import axios from "axios";

import * as key from "../config/key";
import * as actions from "../actions/user";

const userLogin = (userData, props) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`/api/user/signin`, {
        ...userData,
      });
      console.log("response", res);
      console.log("state", getState);
      await dispatch({ type: actions.USER_LOGIN, payload: res.data.user });
      localStorage.setItem("token", res.data.user.token);
      props.history.push("/");
    } catch (error) {
      const data = error.response.data;
      console.log(data);

      if (data == "Unauthorized") {
        dispatch({
          type: actions.USER_ERROR,
          payload: { error: "Email and Password is incorrect" },
        });
      } else {
        dispatch({ type: actions.USER_ERROR, payload: data });
      }
    }
  };
};

const userSignUp = (userData) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`/api/user/signup`, {
        ...userData,
      });
      console.log("signup response", res);
    } catch (error) {
      //   const data = error.response.data;
      //   console.log(error);
      //   if (data.errorMsg.code) {
      //     data.errorMsg = { msg: "Please check your internet connection" };
      //   }
      //   console.log("error data", data);
      //   Object.keys(data.errorMsg).forEach(key =>
      //     console.log(data.errorMsg[key])
      //   );
      //   dispatch({ type: actions.USER_ERROR, payload: data });
    }
  };
};

const getUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(`/api/user/secret`, {
        token: data,
      });
      console.log("secret response ", res);
      await dispatch({
        type: actions.USER_LOGIN,
        payload: { ...res.data.user, token: localStorage.getItem("token") },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export { userLogin, userSignUp, getUser };

//  it si rnning 100% correct and runs well
//  recording by OBS Studio lets check this out
