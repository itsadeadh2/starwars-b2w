const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

function validate(planet) {
  const schema = {
    email: Joi.string().required(),
    senha: Joi.string().required(),
  };
  return Joi.validate(planet, schema);
}

module.exports = {
  User,
  validate,
};
