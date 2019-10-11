const userRepo = require('../repository/user.repository');
const { validate } = require('../models/user.model');

const postUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const userFromDb = await userRepo.getUserByEmail(req.body.email);
  if (userFromDb) return res.status(400).send({ message: 'Usuario ja registrado!' });

  const user = req.body;

  
  const token = await userRepo.postUser(user);
  return res.send({ token });
};

module.exports = {
  postUser,
};
