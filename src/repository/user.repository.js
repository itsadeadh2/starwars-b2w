const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');

const postUser = async (objUser) => {
  const user = new User(objUser);
  const salt = await bcrypt.genSalt(10);
  user.senha = await bcrypt.hash(user.senha, salt);
  await user.save();
  return await user.generateAuthToken();
};

const getUserByEmail = async (email) => await User.findOne({ email });

module.exports = {
  postUser,
  getUserByEmail,
};
