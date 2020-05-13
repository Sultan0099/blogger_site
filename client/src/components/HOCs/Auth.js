import React, { useEffect } from "react";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as userAuth from "../../api/user.api";

const auth = (OriginalComponent) => {
  return connect((state) => {
    return {
      user: { ...state.user },
    };
  }, userAuth)(function (props) {
    const token = localStorage.getItem("token");

    useEffect(() => {
      async function fetchData() {
        try {
          await props.getUser(token);
        } catch (error) {
          props.history.push("/login");
        }
      }
      fetchData();
    }, []);

    if (!token) return <Redirect to="/login" />;
    return <OriginalComponent {...props} />;
  });
};

export default auth;
