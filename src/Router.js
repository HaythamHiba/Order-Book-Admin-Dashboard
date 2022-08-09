import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { AuthComponent } from "AuthComponent";

const HomePage = lazy(() => import("./views/pages/home/HomePage"));
const GaPage = lazy(() => import("./views/pages/google-analytics/GaPage"));
const CategoriesPage = lazy(() =>
  import("./views/pages/categories/CategoriesPage")
);
const SubCategoriesPage = lazy(() =>
  import("./views/pages/subcategories/SubCategoriesPage")
);
const AddOwnerProductPage = lazy(() =>
  import("./views/pages/products/owner_products/AddOwnerProductPage")
);
const ViewAllOwnerProductsPage = lazy(() =>
  import("./views/pages/products/owner_products/ViewAllOwnerProductsPage")
);
const ViewOneOwnerProductPage = lazy(() =>
  import("./views/pages/products/owner_products/ViewOneOwnerProductPage")
);
const AddShopProductPage = lazy(() =>
  import("./views/pages/products/shops_products/AddShopProductPage")
);
const ViewAllShopProductsPage = lazy(() =>
  import("./views/pages/products/shops_products/ViewAllShopProductsPage")
);
const ViewOneShopProductPage = lazy(() =>
  import("./views/pages/products/shops_products/ViewOneShopProductPage")
);

const ShopsPage = lazy(() => import("./views/pages/shops/ShopsPage"));
const ShopCategoriesPage = lazy(() => import("./views/pages/shop_categories/ShopCategoriesPage"));
const ShopDetailsPage = lazy(() =>
  import("./views/pages/shop-details/ShopDetailsPage")
);
const MyAccountPage = lazy(() => import("views/pages/my_account/MyAccount"));

const Slider = lazy(() =>
  import("./views/pages/advertisements/CustomAdsPageWithoutBtn")
);
const ViewAllOrders = lazy(() =>
  import("./views/pages/orders/view-all/Orders")
);
const ViewOneOrderPage = lazy(() =>
  import("./views/pages/orders/view-one/Order")
);
const ViewAllAuctionsOrders = lazy(() =>
  import("./views/pages/auction_orders/view-all/AuctionsOrders")
);
const ViewOneAuctionsOrderPage = lazy(() =>
  import("./views/pages/auction_orders/view-one/AuctionOrder")
);
const AddAuctionOrderPage=lazy(()=>import('./views/pages/auction_orders/AddAuctionOrderPage'));
const AuctionsPage=lazy(()=>
import("./views/pages/auctions/view-all/Auctions"));
const OneAuctionPage=lazy(()=>
import("./views/pages/auctions/view-one/OneAuctionPage"));
const AddAuctionPage=lazy(()=>
import("./views/pages/auctions/AddAuctionPage"));
const SocialMedia = lazy(() =>
  import("./views/pages/socialMedia/SocialMediaPage")
);
const MessagesPage =lazy(()=>import("./views/pages/messages/MessagesPage"));
const ViewAccounts = lazy(() =>
  import("./views/pages/accounts/view/ViewPannel")
);
const DiscountsPage = lazy(() =>
  import("./views/pages/discounts/DicountsPage")
);
const CurrencyPage = lazy(() => import("./views/pages/currency/CurrencyPage"));


// ============== Information ==========================
const PrivacyPage = lazy(() =>
  import("./views/pages/information/privacy/PrivacyPage")
);
const ConditionsPage = lazy(() =>
  import("./views/pages/information/conditions/ConditionsPage")
);
const AboutUsPage = lazy(() =>
  import("./views/pages/information/about_us/AboutUsPage")
);
const CompanyInfoPage = lazy(() =>
  import("./views/pages/information/company_info/CompanyInfoPage")
);
// ======================================================

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
            exact
            path="/google-analytics"
            component={GaPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/myAccount"
            component={MyAccountPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/categories"
            component={CategoriesPage}
            isPrivate
          />
    
          <AppRoute
            isPrivate
            exact
            component={ViewAllOrders}
            path="/all-orders"
          />
          <AppRoute
          isPrivate
          exact
          component={MessagesPage}
          path='/messages'
          />
          <AppRoute
            isPrivate
            exact
            component={ViewOneOrderPage}
            path="/order/:id"
          />
                 <AppRoute
            isPrivate
            exact
            component={ViewAllAuctionsOrders}
            path="/auctions_orders/all"
          />
          <AppRoute
            isPrivate
            exact
            component={ViewOneAuctionsOrderPage}
            path="/auction_order/:id"
          />
            <AppRoute
            isPrivate
            exact
            component={AddAuctionOrderPage}
            path="/auctions_order/add"
          />
          <AppRoute
            exact
            path="/subcategories"
            component={SubCategoriesPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/owner-products/add"
            component={AddOwnerProductPage}
            isPrivate
          />
              <AppRoute
            exact
            path="/auctions/all"
            component={AuctionsPage}
            isPrivate
          />
              <AppRoute
            exact
            path="/auction/view-one/:id"
            component={OneAuctionPage}
            isPrivate
          />
              <AppRoute
            exact
            path="/auction/add"
            component={AddAuctionPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/owner-products/view-all"
            component={ViewAllOwnerProductsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/owner-products/view-one/:id"
            component={ViewOneOwnerProductPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/shops-products/add"
            component={AddShopProductPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/shops-products/view-all"
            component={ViewAllShopProductsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/shops-products/view-one/:id/shop/:shop_id"
            component={ViewOneShopProductPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/discounts"
            component={DiscountsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/currencies"
            component={CurrencyPage}
            isPrivate
          />
          <AppRoute exact path="/shops" component={ShopsPage} isPrivate />
          <AppRoute exact path="/shop_categories" component={ShopCategoriesPage} isPrivate />
     
          <AppRoute
            exact
            path="/shop-details/:id"
            component={ShopDetailsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/social_media"
            component={SocialMedia}
            isPrivate
          />
          <AppRoute
            exact
            path="/information/privacy"
            component={PrivacyPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/information/conditions"
            component={ConditionsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/information/about-us"
            component={AboutUsPage}
            isPrivate
          />
          <AppRoute
            exact
            path="/information/company-info"
            component={CompanyInfoPage}
            isPrivate
          />
          <AppRoute exact path="/advertisements" component={Slider} isPrivate />

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
