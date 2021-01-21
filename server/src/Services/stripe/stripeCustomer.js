import stripe from '../../Config/stripe.js';
import db from '../../Database/db.js';

export const CreateCustomer = async (req, res) => {
  let email = req.body.email;
  let userId = req.body.userId;

  //check if stripe customer already exists
  const existingCustomers = await stripe.customers.list({
    email
  });

  if (existingCustomers.data.length != 0) {
    res.status(400).send({ type: 'Failed Sign Up', message: 'User Already Exists' });
    return;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      databaseUID: userId
    }
  });

  let text = `UPDATE users SET stripe_customer_id=$1 
              WHERE email=$2
              RETURNING stripe_customer_id`;
  let values = [customer.id, email];

  //save stripe customer id to database
  let queryResult = await db.query(text, values);

  res.send(queryResult.rows[0]);
};
