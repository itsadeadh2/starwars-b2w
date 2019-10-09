const planetRepo = require('../repository/planet.repository');
const { validate } = require('../models/planet.model');

const post = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const planet = await planetRepo.postPlanet(req.body);
  if (!planet) return res.send('something went wrong!');
  return res.send('ibi');
};

module.exports = {
  post,
};
