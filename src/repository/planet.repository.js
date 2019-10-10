const axios = require('axios');
const { Planet } = require('../models/planet.model');

const getNumberOfAppearances = async (url) => {
  const { data } = await axios.default.get(url);
  return data.films.length;
};

const postPlanet = async (objPlanet) => {
  const planet = new Planet(objPlanet);
  const { data } = await axios.default.get(`https://swapi.co/api/planets/?search=${objPlanet.nome}`);
  if (data.count === 0) throw new Error('Nenhum planeta encontrado com esse nome :/');
  if (data.count > 1) throw new Error('Voce precisa ser mais específico em relação ao nome...');
  const apiName = data.results[0].name.toString();
  const postName = new RegExp(planet.nome.toString(), 'i');
  if (!apiName.match(postName)) throw new Error('Nenhum planeta encontrado com esse nome  :/');
  planet.nome = apiName;
  planet.qtdeAparicoes = await getNumberOfAppearances(data.results[0].url);
  await planet.save();
  return planet;
};

const getAllPlanets = async (planetName) => await Planet.find({ nome: new RegExp(planetName, 'i') });

const getPlanetById = async (planetId) => await Planet.findById(planetId);

module.exports = {
  postPlanet,
  getAllPlanets,
  getPlanetById,
};
