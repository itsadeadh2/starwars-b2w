const { Planet } = require('../models/planet.model');

const postPlanet = async (objPlanet) => {
  const planet = new Planet(objPlanet);
  await planet.save();
  return planet;
};

const getAllPlanets = async (planetName, { perPage, page }) => await Planet
  .find({ nome: new RegExp(planetName, 'i') })
  .skip((perPage * page) - perPage)
  .limit(perPage);

const getPlanetById = async (planetId) => await Planet.findById(planetId);

const deletePlanetById = async (planetId) => await Planet.findByIdAndRemove(planetId);

module.exports = {
  postPlanet,
  getAllPlanets,
  getPlanetById,
  deletePlanetById,
};
