import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import GoogleBtn from "../components/GoogleBtn";
import * as auth from "../api/user.api";

function Login(props) {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    console.log(e.target.value, e.target.name);
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit() {
    console.log("runs signup");
    console.log(user.email, user.password);

    await props.userSignUp(user);
    console.log(props);
  }

  return (
    <Container className={classes.root}>
      <GoogleBtn />
      <TextField
        variant="filled"
        label="Name"
        name="name"
        type="text"
        fullWidth
        className={classes.textField}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="Email"
        name="email"
        type="text"
        fullWidth
        className={classes.textField}
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="password"
        name="password"
        type="password"
        fullWidth
        className={classes.textField}
        onChange={handleChange}
      />

      {props.user.error && (
        <ul>
          {Object.keys(props.user.errorMsg).map(key => (
            <li key={key}>{props.user.errorMsg[key]}</li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        onClick={handleSubmit}
        variant="outlined"
        color="primary"
      >
        SignUp{" "}
      </Button>

      <Link
        to="/login"
        style={{
          color: "blue",
          // textDecoration: "none",
          fontSize: "13px",
          float: "right",
          marginTop: "25px"
        }}
      >
        Already have an account
      </Link>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    width: 500
  },
  textField: {
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    user: { ...state.user }
  };
};

export default connect(mapStateToProps, auth)(Login);
