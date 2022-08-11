import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { AuthComponent } from "AuthComponent";

const HomePage = lazy(() => import("./views/pages/home/HomePage"));



const ViewAllRestaurentProductsPage = lazy(() =>
  import("./views/pages/products/shops_products/ViewAllShopProductsPage")
);
const ViewOneRestaurantProductPage = lazy(() =>
  import("./views/pages/products/shops_products/ViewOneShopProductPage")
);

const RestaurantsPage = lazy(() => import("./views/pages/restaurants/VendorsPage"));
const RestaurantDetailsPage = lazy(() =>
  import("./views/pages/shop-details/ShopDetailsPage")
);

const ViewAllOrders = lazy(() =>
  import("./views/pages/orders/view-all/Orders")
);
const ViewOneOrderPage = lazy(() =>
  import("./views/pages/orders/view-one/Order")
);

const ViewAccounts = lazy(() =>
  import("./views/pages/accounts/view/ViewPannel")
);





const AddAccount = lazy(() => import("./views/pages/accounts/add/AddAdmin"));
const EditAccount = lazy(() =>
  import("./views/pages/accounts/edit/EditAccount")
);
const UsersPage = lazy(() => import("./views/pages/users/UsersPage"));

// Route-based code splitting
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  auth,
  isPrivate,
  ...rest
}) => {
  const ToRender = () => (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={auth.user.role}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );

  if (isPrivate) {
    return (
      <AuthComponent>
        <ToRender />
      </AuthComponent>
    );
  }
  return <ToRender />;
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={HomePage} isPrivate />
         
          <AppRoute
            isPrivate
            exact
            component={ViewAllOrders}
            path="/all-orders"
          />
         
          <AppRoute
            isPrivate
            exact
            component={ViewOneOrderPage}
            path="/order/:id"
          />
         
          <AppRoute
            exact
            path="/restaurant-products/view-all"
            component={ViewAllRestaurentProductsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/shops-products/view-one/:id/shop/:shop_id"
            component={ViewOneRestaurantProductPage}
            isPrivate
          />
         
          <AppRoute exact path="/vendors" component={RestaurantsPage} isPrivate />
     
          <AppRoute
            exact
            path="/restaurant-details/:id"
            component={RestaurantDetailsPage}
            isPrivate
          />
          
          <AppRoute
            exact
            path="/accounts/view"
            component={ViewAccounts}
            isPrivate
          />
          <AppRoute
            exact
            path="/accounts/edit"
            component={EditAccount}
            isPrivate
          />
          <AppRoute exact path="/users" component={UsersPage} isPrivate />

          <AppRoute
            exact
            path="/accounts/add"
            component={AddAccount}
            isPrivate
          />
          <AppRoute path="/login" component={login} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
