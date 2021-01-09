import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';

import { SignUp, Login, PasswordReset } from '../screens/User/Auth';

const Routes = () => {
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate('/auth/login');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <Router>
      <SignUp path="/auth/signup" />
      <Login path="/auth/login" />
      <PasswordReset path="/auth/passwordreset" />
    </Router>
  );
};

export default Routes;
