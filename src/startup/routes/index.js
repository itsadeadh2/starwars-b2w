const express = require('express');
const indexRoute = require('../../routes/index.routes');
const planetRoute = require('../../routes/planet.routes');
const userRoute = require('../../routes/user.routes');
const authRoute = require('../../routes/auth.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use('/', indexRoute);
  app.use('/planets', planetRoute);
  app.use('/users', userRoute);
  app.use('/auth', authRoute);
};
