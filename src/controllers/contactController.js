const Contact = require('../models/contactModel');


exports.index = (req, res) => {
  return res.render('contact');
};

exports.register = (req, res) => {
  const contact = new Contact(req.body);

  try {
    contact.register();
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
  
  if (contact.errors.length > 0) {
    req.flash('errors', contact.errors);
    req.session.save(() => { res.redirect('/contact') });
    return;
  }

  req.flash('success', 'Contato adicionado com sucesso!');
  req.session.save(() => { res.redirect('/') });
  return;
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.redirect('index');

  try {
    const contactDeleted = await Contact.delete(req.params.id);

    req.flash('success', `${contactDeleted.firstName} deletado com sucesso!`)
    req.session.save(() => { res.redirect('/') });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findContact(id);

    return res.render('editContact', { contact });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editContact = async (req, res) => {
  if (req.body.id.length < 1) return res.render('404');

  const id = req.body.id;
  const contact = new Contact(req.body);
  
  try {
    await contact.edit();
  } catch(e) {
    console.log(e);
    return res.render('404');
  }

  if (contact.errors.length > 0) {
    req.flash('errors', contact.errors);
    return req.session.save(() => res.redirect(`/contact/edit/${id}`));
  }

  req.flash('success', 'Contato editado com sucesso!');
  return req.session.save(() => res.redirect('/'));
};
