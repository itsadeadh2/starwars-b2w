const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = () => {
  const db = process.env.DATABASE;
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}! `));
};
