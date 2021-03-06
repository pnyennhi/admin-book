import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
//abc
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const user = useSelector((store) => store.user);

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("TOKEN_AUTH") ? (
          user?.role !== "User" ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
