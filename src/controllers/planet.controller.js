const planetRepo = require('../repository/planet.repository');
const { validate } = require('../models/planet.model');

const post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const planet = await planetRepo.postPlanet(req.body);
    return res.send(planet);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  post,
};
