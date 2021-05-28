const Contact = require('../models/contactModel');


exports.index = async (req, res) => {
  try {
    const contacts = await Contact.allContacts();
    return res.render('index', { contacts });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};
