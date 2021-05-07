import React from "react";
import { Switch } from "react-router";
import PublicRoute from "../../routes/publicRoute";

// Pages
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";

const User = () => {
  return (
    <Switch>
      <PublicRoute exact path={`/login`} component={Login} />
      <PublicRoute exact path={`/register`} component={Register} />
      <PublicRoute path={`/main`} component={Main} />
    </Switch>
  );
};

export default User;
