const express = require('express');
const indexRoute = require('../../routes/index.routes');
const planetRoute = require('../../routes/planet.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use('/', indexRoute);
  app.use('/planets', planetRoute);
};
