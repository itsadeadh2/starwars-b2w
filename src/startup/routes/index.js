const express = require('express');
const indexRoute = require('../../routes/index.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use('/', indexRoute);
};
