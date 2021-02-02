import express from 'express';
const router = express.Router();

import { asyncHandler } from '../Middleware/asyncErrorHandler.js';

import { CreateCustomer } from '../Services/stripe/stripeCustomer.js';

import { OneTimePayConfirm } from '../Services/stripe/stripeOneTimePay.js';

import {
  CreateSetupIntent,
  GetWallet,
  AttachPaymentMethod,
  RemovePaymentMethod,
  CreatePaymentIntent
} from '../Services/stripe/stripeHelpers.js';

import {
  CancelSubscription,
  GetSubscription,
  CreateSubscription,
  UpdateSubscription
} from '../Services/stripe/stripeSubscription.js';

/* Helper Routes */
router.get('/get-wallet', asyncHandler(GetWallet));

router.post('/wallet', asyncHandler(CreateSetupIntent));

router.post('/remove-payment', asyncHandler(RemovePaymentMethod));

router.post('/attach-payment', asyncHandler(AttachPaymentMethod));

router.get('/payment-intent', asyncHandler(CreatePaymentIntent));

/* Subscription Routes */
router.get('/get-subscription', asyncHandler(GetSubscription));

router.post('/create-subscription', asyncHandler(CreateSubscription));

router.post('/cancel-subscription', asyncHandler(CancelSubscription));

router.put('/update-subscription', asyncHandler(UpdateSubscription));

/* Customer Routes */
router.post('/create-customer', asyncHandler(CreateCustomer));

/* One time pay Routes */
router.post('/one-time-pay', asyncHandler(OneTimePayConfirm));

export default router;
