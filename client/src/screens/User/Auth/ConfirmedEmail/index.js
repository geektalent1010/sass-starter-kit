import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../utils/authContext';
import axios from '../../../../services/axios';
import { navigate } from 'gatsby';

const ConfirmedEmail = ({ location }) => {
  const { authState, firebase, LogIn } = useContext(AuthContext);
  const [stripeKey, setStripeKey] = useState('');

  //api context

  console.log(location);

  //extract query params
  const queryParams = location.search.split('=');
  const email = queryParams[1].split('&')[0];
  const id = queryParams[2].split('&')[0];
  const provider = queryParams[4];
  const usernameRaw = queryParams[3].split('&')[0];
  const name = usernameRaw.split('%20');
  const username = `${name[0]} ${name[1]}`;
  const photo = null;

  const user = { email, username, id, photo, provider, stripeKey };
  console.log(user);

  useEffect(() => {
    //fetchSuccess
  }, []);

  useEffect(() => {
    //if (queryParams) createValidUser();
  }, []);

  //after verified email, the user info is saved to stripe and sendinblue
  const createValidUser = async () => {
    //fetchInit
    let userId = id;
    let stripeApiData = { userId, email };
    let stripeServerRes = await axios
      .post('/stripe/create-customer', stripeApiData)
      .catch((err) => {
        //fetchFailure(err);
      });

    setStripeKey(stripeServerRes.data.stripe_customer_id);
    console.log(stripeServerRes);
    //save email to sendinblue

    //Login to context
    await LogIn(user);
    navigate('/user/profile');
  };

  return (
    <div>
      <div>Thank You for confirming your email, your account is setup and ready to use</div>
    </div>
  );
};

export default ConfirmedEmail;
