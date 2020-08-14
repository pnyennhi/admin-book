import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Book from "./containers/Book/Book";
import User from "./containers/User/User";
import Category from "./containers/Category/Category";
import Publisher from "./containers/Publisher/Publisher";
import Profile from "./containers/Personal/Profile";
import ChangePassword from "./containers/Personal/ChangePassword";
import Review from "./containers/Review/Review";
import Contact from "./containers/Contact/Contact";
import Coupon from "./containers/Coupon/Coupon";
import Order from "./containers/Order/Order";
import Shipping from "./containers/Shipping/Shipping";
import Subcriber from "./containers/Subcriber/Subcriber";

import PrivateAdminRoute from "./components/PrivateAdminRoute";
//abc
const AdminRoutes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <PrivateAdminRoute path="/book" component={Book} type="book" />
          <PrivateAdminRoute path="/user" component={User} type="user" />
          <PrivateAdminRoute
            path="/category"
            component={Category}
            type="category"
          />
          <PrivateAdminRoute
            path="/publisher"
            component={Publisher}
            type="publisher"
          />
          <PrivateAdminRoute path="/review" component={Review} type="review" />
          <PrivateAdminRoute
            path="/contact"
            component={Contact}
            type="contact"
          />
          <PrivateAdminRoute path="/coupon" component={Coupon} type="coupon" />
          <PrivateAdminRoute path="/order" component={Order} type="order" />
          <PrivateAdminRoute
            path="/shipping"
            component={Shipping}
            type="shipping"
          />
          <PrivateAdminRoute
            path="/subcriber"
            component={Subcriber}
            type="subscriber"
          />
          <Route path="/profile" component={Profile} />
          <Route path="/changepassword" component={ChangePassword} />
          <Redirect exact from="/" to="/dashboard" />
          <Redirect exact from="/login" to="/dashboard" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AdminRoutes;
