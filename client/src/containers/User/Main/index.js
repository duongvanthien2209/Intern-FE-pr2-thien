import OrderCompleted from "containers/OrderCompleted";
import DefaultLayout from "layouts/user/DefaultLayout";
import React from "react";
import { Switch, useRouteMatch } from "react-router";
import PublicRoute from "routes/publicRoute";
import PrivateRoute from "routes/User/privateRoute";
import Cart from "../Cart";
import Order from "../Order";
import Product from "../Product";
import ProductDetail from "../ProductDetail";

const Main = () => {
  const match = useRouteMatch();

  return (
    <DefaultLayout>
      <Switch>
        <PublicRoute
          path={`${match.url}/product/:categoryId`}
          component={Product}
        />

        <PublicRoute
          path={`${match.url}/product-detail/:productId`}
          component={ProductDetail}
        />

        <PublicRoute exact path={`${match.url}/cart`} component={Cart} />

        <PrivateRoute exact path={`${match.url}/order`} component={Order} />

        <PrivateRoute
          path={`${match.url}/orderCompleted/:orderId`}
          component={OrderCompleted}
        />

        <PublicRoute
          exact
          path={`${match.url}`}
          component={() => <h1>Default Main</h1>}
        />
      </Switch>
    </DefaultLayout>
  );
};

export default Main;
