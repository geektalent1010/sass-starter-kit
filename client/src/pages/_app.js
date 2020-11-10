import React, { useState, useReducer, useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../utils/styledComponentsTheme';
import AuthContext from '../utils/authContext';
import { authReducer, initialStateAuth } from '../store/reducers/authReducer';
import { Login, Logout } from '../store/actions/actions';
import { firebaseApp as firebase } from '../services/firebase';

function MyApp({ Component, pageProps }) {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth);

  const LogIn = (user) => {
    dispatchAuth(Login(user));
  };

  const LogOut = () => {
    dispatchAuth(Logout);
  };

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
