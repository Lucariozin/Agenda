const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController')


route.get('/', homeController.index);
route.post('/', homeController.searchContacts);

route.get('/contact', contactController.index);
route.post('/contact/register', contactController.register);
route.get('/contact/delete/:id', contactController.delete);
route.get('/contact/edit/:id', contactController.edit);
route.post('/contact/edit', contactController.editContact);


module.exports = route;
