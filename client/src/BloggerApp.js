import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import EmailVerification from "./pages/EmailVerification";

import Navbar from "./components/Navbar";

export default function BloggerApp() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Signup} />
        <Route exact={true} path="/" component={Welcome} />
        <Route
          exact={true}
          path="/emailVerification/:id"
          component={EmailVerification}
        />
      </Switch>
    </>
  );
}
