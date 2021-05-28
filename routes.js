const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController')


route.get('/', homeController.index);

route.get('/contact', contactController.index);
route.post('/contact/register', contactController.register);
route.get('/contact/delete/:id', contactController.delete);


module.exports = route;
