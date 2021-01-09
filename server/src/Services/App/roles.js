import db from '../../Database/db.js';

export const getRole = async (req, res) => {
  let user_id = req.query.user_id;
  let app_id = req.query.app_id;

  console.log(user_id);

  let text = `
      SELECT
        a.app_id,
        a.app_name,
        r.user_id,
        r.is_admin, 
        r.is_user
      FROM
        app a
      INNER JOIN roles r 
          ON r.app_id = a.app_id
      WHERE r.user_id=$1 AND r.app_id=$2
  `;

  let values = [user_id, app_id];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};

export const postRole = async (req, res) => {
  let app_id = req.body.app_id;
  let user_id = req.body.user_id;
  let is_admin = req.body.is_admin;
  let is_user = req.body.is_user;

  let text = `INSERT INTO roles(app_id, user_id, is_admin, is_user)
              VALUES ($1, $2, $3, $4)`;
  let values = [app_id, user_id, is_admin, is_user];

  let queryResult = await db.query(text, values);
  res.send(queryResult.rows);
};
