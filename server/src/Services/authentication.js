import db from '../Database/db.js';
import { setToken } from '../Config/passport.js';
import firebase from 'firebase-admin';

const admin = firebase.initializeApp();

export const SignUp = (req, res) => {
  let token = req.body.token;
  let username = req.body.username;

  const saveUsertoDB = (email, username) => {
    /* Save user to our own db and get unique key from db */

    //check if email exists
    let query1 = `SELECT * FROM users
                WHERE email=$1`;

    //if email not found insert into database
    let query2 = `INSERT INTO users (username, email)
                VALUES($1, $2)
                RETURNING id`;

    let values1 = [email];

    let values2 = [username, email];

    //signup user, called inside callback1
    let callback2 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      //send back user id after signup
      if (q_res.rows[0]) {
        let id = q_res.rows[0].id;
        console.log(id);
        //jwt token login after signup
        res.send({ token: setToken(id) });
      }
    };

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        res.send('User Already Exists');
      }
      if (q_res.rows.length === 0) {
        //if email not found, create user in db
        db.query(query2, values2, callback2);
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let name = username;
      let email = decodedToken.email;

      saveUsertoDB(email, name);
    })
    .catch((error) => {
      res.send('error signing up');
      console.log(error);
    });
};

export const Login = (req, res) => {
  let token = req.body.token;

  const CheckUserExists = (email) => {
    /* Check if users exists then jwt login */

    //check if email exists
    let query1 = `SELECT * FROM users
                  WHERE email=$1`;

    let values1 = [email];

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        let id = q_res.rows[0].id;
        console.log(id);
        res.send({ token: setToken(id) });
      }
      if (q_res.rows.length === 0) {
        //if email not found
        res.send('Email Not Found');
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let email = decodedToken.email;

      CheckUserExists(email);
    })
    .catch((error) => {
      res.send('error loggin in');
      console.log(error);
    });
};

//sign in or sign up user then send jwt token
export const LoginOrSignUp = (req, res) => {
  let token = req.body.token;
  let username = req.body.username;
  console.log(username);

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      let name = username;
      let email = decodedToken.email;

      saveUsertoDB(email, name);
    })
    .catch((error) => {
      res.send('error loggin in');
      console.log(error);
    });

  const saveUsertoDB = (email, username) => {
    /* Save user to our own db and get unique key from db */

    //check if email exists
    let query1 = `SELECT * FROM users
                  WHERE email=$1`;

    //if email not found insert into database
    let query2 = `INSERT INTO users (username, email)
                  VALUES($1, $2)
                  RETURNING id`;

    let values1 = [email];

    let values2 = [username, email];

    //signup user, called inside callback1
    let callback2 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      //send back user id after signup
      if (q_res.rows[0]) {
        let id = q_res.rows[0].id;
        console.log(id);
        //jwt token login after signup
        res.send({ token: setToken(id) });
      }
    };

    //Check if user exists callback
    let callback1 = (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.status(500).send(q_err);
      }
      if (q_res.rows.length != 0) {
        //if user exists then jwt login
        let id = q_res.rows[0].id;
        console.log(id);
        res.send({ token: setToken(id) });
      }
      if (q_res.rows.length === 0) {
        //if email not found, create user in db
        console.log('FFFF');
        db.query(query2, values2, callback2);
      }
    };

    //check if user exists
    db.query(query1, values1, callback1);
  };
};

export const updateUsername = (req, res) => {
  let id = req.body.id;
  let username = req.body.username;

  let text = `UPDATE users SET username=$1
              WHERE id = $2`;
  let values = [username, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};

export const updateEmail = (req, res) => {
  let id = req.body.id;
  let email = req.body.email;

  let text = `UPDATE users SET email=$1
              WHERE id = $2`;
  let values = [email, id];

  let callback = (q_err, q_res) => {
    if (q_err) console.log(q_err);
    res.json(q_res.rows);
  };

  db.query(text, values, callback);
};
