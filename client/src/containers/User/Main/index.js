import DefaultLayout from "layouts/user/DefaultLayout";
import React from "react";
import { Switch, useRouteMatch } from "react-router";
import PublicRoute from "routes/publicRoute";
import Product from "../Product";

const Main = () => {
  const match = useRouteMatch();

  console.log(match.url);

  return (
    <Switch>
      <DefaultLayout>
        <PublicRoute
          exact
          path={`${match.url}`}
          component={() => <h1>Default Main</h1>}
        />
        <PublicRoute exact path={`${match.url}/product`} component={Product} />
      </DefaultLayout>
    </Switch>
  );
};

export default Main;
