import { SibContactsApi } from '../../Config/sendinblue.js';
import { sendEmail } from '../../Config/email.js';

/* Save signed up user's email to sendinblue */

export const CreateContact = async (req, res) => {
  const FIRSTNAME = req.body.firstName;
  const email = req.body.email;

  const listId = parseInt(process.env.SendInBlue_ListId);

  const contact = {
    attributes: {
      FIRSTNAME
    },
    listIds: [listId],
    email
  };

  await SibContactsApi.createContact(contact).catch((err) => console.log(err));

  //send welcome email
  let template = 'welcome';
  let locals = { FIRSTNAME };

  await sendEmail(email, template, locals);
  res.status(200).send('Email saved to Sendinblue');
};

//update sib email when user updates account email
//called in Services/auth/authentication.js updateEmail()
export const UpdateContact = async (email, oldEmail) => {
  const updateContact = {
    attributes: {
      Email: email
    }
  };

  await SibContactsApi.updateContact(oldEmail, updateContact).catch((err) => console.log(err));
  return;
};
