const Joi = require('joi');
const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  clima: {
    type: String,
    required: true,
  },
  terreno: {
    type: String,
    required: true,
  },
  qtdeAparicoes: {
    type: Number,
    required: true,
  },
});

const Planet = mongoose.model('Planet', planetSchema);

function validate(planet) {
  const schema = {
    nome: Joi.string().required(),
    clima: Joi.string().required(),
    terreno: Joi.string().required()
  };
  return Joi.validate(planet, schema);
}

module.exports = {
  Planet,
  validate,
};
