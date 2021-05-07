import DefaultLayout from "layouts/user/DefaultLayout";
import React from "react";
import { Switch, useRouteMatch } from "react-router";
import PublicRoute from "routes/publicRoute";
import Cart from "../Cart";
import Product from "../Product";
import ProductDetail from "../ProductDetail";

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

        <PublicRoute
          path={`${match.url}/product-detail/:productId`}
          component={ProductDetail}
        />

        <PublicRoute exact path={`${match.url}/cart`} component={Cart} />
      </DefaultLayout>
    </Switch>
  );
};

export default Main;
