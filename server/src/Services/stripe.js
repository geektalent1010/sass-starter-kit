import stripe from '../Config/stripe.js';
import db from '../Database/db.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: userId
    }
  });

  let text = `UPDATE users SET StripeCustomerID=$1 
              WHERE email=$2
              RETURNING StripeCustomerID`;
  let values = [customer.id, email];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.send(q_res.rows[0]);
  };

  //save stripe customer id to database
  db.query(text, values, callback);
};

export const CreateSetupIntent = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  console.log(customer_id);

  if (customer_id) {
    const setupIntent = await stripe.setupIntents.create({
      customer: customer_id
    });

    res.send(setupIntent);
  } else {
    res.send('Customer Key Not Found');
  }
};

export const CreateSubscription = async (req, res) => {
  let customer_id = req.body.customer.stripeCustomerKey;
  let payment_method = req.body.payment_method;
  let email = req.body.customer.email;

  console.log(customer_id);

  /* It is Possible to retrieve the plans programtically but this is a waste 
    of an api call, plans dont change often so it is faster just to hard code */
  let plan = 'price_1HvUopAtqjBKUOx9tEoDdrhQ';

  // Attach the  payment method to the customer
  await stripe.paymentMethods.attach(payment_method, { customer: customer_id });

  // Set it as the default payment method
  await stripe.customers.update(customer_id, {
    invoice_settings: { default_payment_method: payment_method }
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer_id,
    items: [{ plan }],
    expand: ['latest_invoice.payment_intent']
  });

  if (!subscription) res.send('Failed to create subscription, please contact support');

  if (subscription.latest_invoice.payment_intent.status === 'succeeded') {
    //update db to users subscription
    let text = `UPDATE users SET isPaidMember=$1
                WHERE email = $2`;
    let values = ['true', email];

    let callback = (q_err, q_res) => {
      if (q_err) res.send(q_err);
    };

    db.query(text, values, callback);
  }

  res.send(subscription);
};
