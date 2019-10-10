const { User } = require('../models/user.model');

const postUser = async (objUser) => {
  const user = new User(objUser);
  await user.save();
  return await user.generateAuthToken();
};

const getUserByEmail = async (email) => await User.findOne({ email });

module.exports = {
  postUser,
  getUserByEmail,
};
