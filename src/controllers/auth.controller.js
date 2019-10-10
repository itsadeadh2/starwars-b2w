const bcrypt = require('bcrypt');
const userRepo = require('../repository/user.repository');
const { validate } = require('../models/user.model');

const postUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: 'Email ou Senha inválidos.' });

  const userFromDb = await userRepo.getUserByEmail(req.body.email);
  if (!userFromDb) return res.status(400).send({ message: 'Email ou Senha inválidos.' });

  const validPassword = await bcrypt.compare(req.body.senha, userFromDb.senha);
  if(!validPassword) return res.status(400).send({ message: 'Email ou Senha inválidos.' });

  const token = user.generateAuthToken();
  return res.send({ token });
};

module.exports = {
  postUser,
};
