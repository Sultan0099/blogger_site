import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import EmailVerification from "./pages/EmailVerification";
import CreateNote from "./pages/CreateNote";
import SinglePost from "./pages/SinglePost"

import auth from "./components/HOCs/Auth";

export default function BloggerApp() {
  return (
    <>
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Signup} />
        <Route exact={true} path="/" component={auth(Welcome)} />
        <Route
          exact={true}
          path="/emailVerification/:id"
          component={EmailVerification}
        />
        <Route exact={true} path="/post/create" component={auth(CreateNote)} />
        <Route exact={true} path="/post/:postId" component={auth(SinglePost)} />
      </Switch>
    </>
  );
}
