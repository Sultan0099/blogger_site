import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";

export default function BloggerApp() {
  return (
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/signup" component={Signup} />
      <Route exact={true} path="/" component={Welcome} />
    </Switch>
  );
}
