import DefaultLayout from "layouts/user/DefaultLayout";
import React from "react";
import { Switch, useRouteMatch } from "react-router";
import PublicRoute from "routes/publicRoute";
import Product from "../Product";

const Main = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <DefaultLayout>
        <PublicRoute
          exact
          path={`${match.url}`}
          component={() => <h1>Default Main</h1>}
        />
        <PublicRoute
          path={`${match.url}/product/:categoryId`}
          component={Product}
        />
      </DefaultLayout>
    </Switch>
  );
};

export default Main;
