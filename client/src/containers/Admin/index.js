import React from "react";
import { Switch, useRouteMatch } from "react-router";
import PublicRoute from "routes/publicRoute";
import Login from "./Login";

const Admin = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={`${match.url}/login`} component={Login} />
      <PublicRoute path={`${match.url}`} component={() => <h1>Amin</h1>} />
    </Switch>
  );
};

export default Admin;
