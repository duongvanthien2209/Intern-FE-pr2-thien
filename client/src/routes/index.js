import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Pages
import Admin from "../containers/Admin";
import User from "../containers/User";

import PublicRoute from "./publicRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/admin" exact component={Admin} />

        <PublicRoute path="/" component={User} />
      </Switch>
    </Router>
  );
};

export default Routes;
