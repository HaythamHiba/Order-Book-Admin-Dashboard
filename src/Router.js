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


const RestaurantsPage = lazy(() => import("./views/pages/vendors/VendorsPage"));



const vendorsCategories=lazy(()=>import("./views/pages/categories/CategoriesPage"))
const VendorsSubCategories=lazy(()=>import("./views/pages/subcategories/SubCategoriesPage"))
const ViewAllVendorItemsPage=lazy(()=>import("./views/pages/products/shops_products/ViewAllShopProductsPage"))
const ViewOneVendorItemPage=lazy(()=>import("./views/pages/products/view-one/ViewOneProductPage"));
const viewVendorImages=lazy(()=>import("./views/pages/images/ImagesPage"));
const ViewVendorMapsPage=lazy(()=>import("./views/pages/oneTable/OneTableChartPage"))
const ViewOffersPage=lazy(()=>import("./views/pages/offers/OffersPage"))

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
            exact
            path="/restaurant-products/view-all"
            component={ViewAllRestaurentProductsPage}
            isPrivate
          />

         
          <AppRoute exact path="/vendors" component={RestaurantsPage} isPrivate />
          <AppRoute exact path="/vendor_categories" component={vendorsCategories} isPrivate />
          <AppRoute exact path="/vendor_subcategories" component={VendorsSubCategories} isPrivate />

          <AppRoute
            exact
            path="/vendor_items"
            component={ViewAllVendorItemsPage}
            isPrivate
          />
           
          <AppRoute
            exact
            path="/vendor_items/:vendor_id/view-one/:id/category/:category_id"
            component={ViewOneVendorItemPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/vendor/:vendor_id/images"
            component={viewVendorImages}
            isPrivate
          />
           <AppRoute
            exact
            path="/vendor/maps"
            component={ViewVendorMapsPage}
            isPrivate
          />
           <AppRoute
            exact
            path="/vendor_offers"
            component={ViewOffersPage}
            isPrivate
          />
      
      
          <AppRoute exact path="/users" component={UsersPage} isPrivate />

        
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
