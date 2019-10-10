const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: 'O id informado é inválido!' });
  }
  return next();
};

module.exports = validateObjectId;
