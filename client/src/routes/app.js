import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { useLocation } from '@reach/router';

import AuthContext from '../utils/authContext';
import CaslContext from '../utils/caslContext';
import ApiContext from '../utils/apiContext';
import { getRole } from './helpers';

import Layout from '../components/App/AppLayout';

import {
  Create,
  Dashboard,
  ReadUpdate,
  Permissions,
  Onboarding,
  Users,
  MachineLearning
} from '../screens/App';

const Routes = () => {
  const location = useLocation();
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const { fetchFailure } = useContext(ApiContext);
  const splitPath = location.pathname.split('/');
  const org_id = splitPath[2];

  /* eslint-disable */
  useEffect(() => {
    if (authState.user) getRole(org_id, ability, authState, fetchFailure);
  }, [authState]);
  /* eslint-enable */

  return (
    <Layout org_id={org_id}>
      <Router>
        {/*<PrivateRoute path="/app/:id/dashboard" component={Dashboard} app_id={app_id} />*/}
        <Dashboard org_id={org_id} path="/app/:id/dashboard" />
        <Create org_id={org_id} path="/app/:id/create" />
        <ReadUpdate org_id={org_id} path="/app/:id/readupdate" />
        <Permissions org_id={org_id} path="/app/:id/permissions" />
        <Users org_id={org_id} path="/app/:id/users" />
        <Onboarding org_id={org_id} path="/app/:id/onboarding" />
        <MachineLearning org_id={org_id} path="/app/:id/machinelearning" />
      </Router>
    </Layout>
  );
};

export default Routes;
