import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../Context/Context'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useAppContext();
  const { isLoggedIn } = context;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
