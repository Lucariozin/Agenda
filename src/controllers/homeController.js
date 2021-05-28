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

exports.searchContacts = async (req, res) => {
  const caracter = req.body.search;

  if (caracter.length == 0) return res.redirect('/');

  try {
    const contacts = await Contact.searchContacts(caracter);
    return res.render('index', { contacts });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};
