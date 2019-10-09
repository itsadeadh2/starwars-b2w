const axios = require('axios');
const { Planet } = require('../models/planet.model');

const postPlanet = async (objPlanet) => {
  const planet = new Planet(objPlanet);
  const planetFromSwApi = await axios.default.get(`https://swapi.co/api/planets/?search=${objPlanet.nome}`);
  console.log(planetFromSwApi.body);
  if (!planetFromSwApi.body) return null;
  await planet.save();
  return planet;
};

module.exports = {
  postPlanet,
};
