import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import GoogleBtn from "../components/GoogleBtn";
import * as auth from "../api/user.api";

function Login(props) {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "user@example.com",
    password: "1234567",
  });

  function handleChange(e) {
    console.log(e.target.value, e.target.name);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    console.log("runs");
    console.log(user.email, user.password);

    await props.userLogin(
      { email: user.email, password: user.password },
      props
    );
  }

  return (
    <Container className={classes.root}>
      <GoogleBtn />
      <TextField
        variant="filled"
        label="Email"
        name="email"
        type="text"
        fullWidth
        value={user.email}
        className={classes.textField}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="password"
        name="password"
        type="password"
        fullWidth
        value={user.password}
        className={classes.textField}
        onChange={handleChange}
      />
      {props.user.error
        ? Object.keys(props.user.errorMsg).map((v) => (
          <p key={v}> {props.user.errorMsg[v]}</p>
        ))
        : ""}
      <p> Don't put you personal information like email , name in any case . Thank you ! </p>
      <Button
        type="button"
        onClick={handleSubmit}
        variant="outlined"
        color="primary"
      >
        Login{" "}
      </Button>
      <Link
        to="/register"
        style={{
          color: "blue",
          // textDecoration: "none",
          fontSize: "13px",
          float: "right",
          marginTop: "25px",
        }}
      >
        {" "}
        Create New Account{" "}
      </Link>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: 500,
  },
  textField: {
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps, auth)(Login);
