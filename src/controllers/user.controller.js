const bcrypt = require('bcrypt');
const userRepo = require('../repository/user.repository');
const { validate } = require('../models/user.model');

const postUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = req.body;

  const salt = await bcrypt.genSalt(10);
  user.senha = await bcrypt.hash(user.senha, salt);
  user = await userRepo.postUser(user);
  return res.send(user);
};

module.exports = {
  postUser,
};
