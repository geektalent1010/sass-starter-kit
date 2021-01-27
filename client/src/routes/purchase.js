import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import {
  Payment,
  CheckAuth,
  PlanSelect,
  ConfirmSub,
  SubscriptionExists
} from '../screens/Purchase';

const Routes = () => {
  return (
    <Router>
      <CheckAuth path="/purchase/checkauth" />
      <Payment path="/purchase/payment" />
      <PlanSelect path="/purchase/plan" />
      <ConfirmSub path="/purchase/confirm" />
      <SubscriptionExists path="/purchase/subcriptionexists" />
      <CheckAuth path="/purchase" />
    </Router>
  );
};

export default Routes;
