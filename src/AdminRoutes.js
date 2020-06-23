import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Book from "./containers/Book/Book";
import User from "./containers/User/User";
import Category from "./containers/Category/Category";
import Publisher from "./containers/Publisher/Publisher";
import Profile from "./containers/Personal/Profile";
import ChangePassword from "./containers/Personal/ChangePassword";
import Review from "./containers/Review/Review";
import Coupon from "./containers/Coupon/Coupon";
import Shipping from "./containers/Shipping/Shipping";

const AdminRoutes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/book" component={Book} />
          <Route path="/user" component={User} />
          <Route path="/category" component={Category} />
          <Route path="/publisher" component={Publisher} />
          <Route path="/review" component={Review} />
          <Route path="/coupon" component={Coupon} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/profile" component={Profile} />
          <Route path="/changepassword" component={ChangePassword} />
          <Redirect exact from="/" to="/book" />
          <Redirect exact from="/login" to="/book" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AdminRoutes;