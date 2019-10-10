const { User } = require('../models/user.model');

const postUser = async (objUser) => {
  let user = new User(objUser);
  return await user.save();
}

module.exports = {
  postUser,
};
