const express = require('express');

const app = express();
require('./startup/routes')(app);
require('./startup/database')();

module.exports = app;
