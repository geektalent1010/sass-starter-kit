import jwt_decode from 'jwt-decode';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import { SignupToServer, LoginToServer } from '../../../api/authApi';
import { createCustomer } from '../../../api/stripeApi';

//valid format for setting an email and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 Characters')
    .max(50, 'Password Too Long')
    .required('Password Required')
});

//Save user information to our own db and and create stripe customer
export const Authentication = async (
  authRes,
  LogIn,
  isLogin,
  firebase,
  setErrMessage,
  setLoading
) => {
  console.log(authRes);

  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Login Failed, please contact support');
      throw new Error('Firebase Token Not Found');
    });

  //server firebase authentication, returns jwt token
  let authServerRes;
  let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
  let email = authRes.user.email;

  if (isLogin) {
    authServerRes = await LoginToServer(email, token).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Server Login Failed, please refresh the browser and try again');
      throw new Error('Server Side Login Fail');
    });
  } else {
    authServerRes = await SignupToServer(email, username, token).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Server Signup Failed, please contact Support');
      throw new Error('Server Side Signup Fail');
    });
  }

  let userId;
  //decode jwt token recieved from server
  if (jwt_decode(authServerRes.data.token)) {
    userId = jwt_decode(authServerRes.data.token).user;
  } else {
    setLoading(false);
    setErrMessage('Authentication Failed, please contact Support');
    throw new Error('JWT decode failed or JWT invalid');
  }

  let stripeServerRes;
  console.log(authServerRes);
  if (!isLogin) {
    //create stripe customer based on our own server user id
    stripeServerRes = await createCustomer(userId, email).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Sign-Up Failed, Please Contact support');
      throw new Error('Stripe Signup Fail');
    });
  } else {
    //for login, stripe customer key is returned from our own db during server auth
    stripeServerRes = authServerRes;
  }

  console.log(stripeServerRes);

  //save user data to React context
  LogintoContext(userId, authRes, stripeServerRes, LogIn);
};

//Save user Info to Context
export const LogintoContext = async (user_id, authRes, stripeKey, LogIn) => {
  console.log(authRes);
  console.log(stripeKey);

  let email = authRes.user.email;
  let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
  let id = user_id;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let stripeCustomerKey = stripeKey.data.stripe_customer_id;

  console.log(stripeCustomerKey);

  let user = {
    email,
    username,
    id,
    photo,
    provider,
    stripeCustomerKey
  };

  await LogIn(user);
  setTimeout(() => navigate('/app'), 200);
};
