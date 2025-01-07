'use strict';
const express = require('express');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const homeController = require('./controllers/homeController');
const path = require('path');
const methodOverride = require('method-override');


const userRoutes = require('./routers/users.js');
const contactForm = require('./routers/contactPage.js');
const removePage = require('./routers/removePage.js');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(layouts);


//render home page
app.get('/', homeController);

app.use('/users', userRoutes);
app.use('/contact', contactForm);
app.use('/remove', removePage);

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`);
});