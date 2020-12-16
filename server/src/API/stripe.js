import express from 'express';
const router = express.Router();

import {
  CreateCustomer,
  CreateSetupIntent,
  CreateSubscription,
  CancelSubscription
} from '../Services/stripe.js';

router.post('/customer', CreateCustomer);

router.post('/wallet', CreateSetupIntent);

router.post('/subscription', CreateSubscription);

router.post('/cancel-subscription', CancelSubscription);

export default router;
