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

const getAll = async (req, res) => {
  try {
    const planets = await planetRepo.getAllPlanets(req.query.nome);
    return res.send(planets);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};


const getById = async (req, res) => {
  try {
    const planet = await planetRepo.getPlanetById(req.params.id);
    if (!planet) return res.status(404).send({ message: 'Planeta nao encontrado.' });
    return res.send(planet);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

}

module.exports = {
  post,
  getAll,
  getById,
};
