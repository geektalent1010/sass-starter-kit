import React, { useReducer, useEffect } from 'react';

import '../styles/globals.css';
import 'antd/dist/antd.css';

import AuthContext from './authContext';
import { authReducer, initialStateAuth } from '../store/reducers/authReducer';
import { Login, Logout } from '../store/actions/actions';

import OrgContext from './orgContext';
import { orgReducer, initialStateOrg } from '../store/reducers/orgReducer';
import { Remove_Org, Set_Org } from '../store/actions/actions';

import ApiContext from './apiContext';
import { apiReducer, initialStateApi } from '../store/reducers/apiReducer';
import { Fetch_failure, Fetch_init, Fetch_success } from '../store/actions/actions';

import CaslContext from './caslContext';
import { ability } from './caslAbility';

import { firebaseApp as firebase } from '../services/firebase';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

import { silentAuth } from './helpers';

const RootWrapper = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth);
  const [apiState, dispatchApi] = useReducer(apiReducer, initialStateApi);
  const [orgState, dispatchOrg] = useReducer(orgReducer, initialStateOrg);

  const LogIn = (user) => {
    dispatchAuth(Login(user));
  };

  const LogOut = () => {
    dispatchAuth(Logout);
    dispatchOrg(Remove_Org);
    firebase.auth().signOut();
  };

  const fetchFailure = (error) => {
    dispatchApi(Fetch_failure(error));
    throw new Error('Error Detected, code execution stopped');
  };

  const fetchInit = () => {
    dispatchApi(Fetch_init);
  };

  const fetchSuccess = () => {
    dispatchApi(Fetch_success);
  };

  const SetOrg = (payload) => {
    dispatchOrg(Set_Org(payload));
  };

  useEffect(() => {
    silentAuth(LogIn, LogOut);
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ApiContext.Provider value={{ apiState, fetchFailure, fetchInit, fetchSuccess }}>
        <OrgContext.Provider value={{ SetOrg, orgState }}>
          <CaslContext.Provider value={ability}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </CaslContext.Provider>
        </OrgContext.Provider>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default RootWrapper;
