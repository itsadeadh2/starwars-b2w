const axios = require('axios');

const swApiService = {
  async getPlanetsByName(planetName) {
    const { data } = await axios.default.get(`https://swapi.co/api/planets/?search=${planetName}`);
    if (data.count === 0) throw new Error('Nenhum planeta encontrado com esse nome :/');
    if (data.count > 1) throw new Error('Voce precisa ser mais específico em relação ao nome...');
    const apiName = data.results[0].name.toString();
    const postName = new RegExp(planetName.toString(), 'i');
    if (!apiName.match(postName)) throw new Error('Nenhum planeta encontrado com esse nome  :/');    
    return data.results[0];
  },

  async getNumberOfAppearances(url) {
    const { data } = await axios.default.get(url);
    return data.films.length;
  },
};

module.exports = {
  swApiService,
};
