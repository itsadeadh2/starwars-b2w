const request = require('supertest');
const { Planet } = require('../src/models/planet.model');
const expect = require('chai').expect;

let server;

describe('/planets', () => {
  beforeEach(() => {
    server = require('../bin/server');
  });
  afterEach(async () => {
    await Planet.deleteMany({});
    await server.close();
  });

  let planeta;

  beforeEach(async () => {
    planeta = {
      nome: 'Alderaan',
      clima: 'Quente',
      terreno: 'Acidentado',
    };
  });

  describe('POST', () => {
    const exec = async () => await request(server)
      .post('/planets')
      .send(planeta);

    it('should return 200 if everything is ok', async () => {
      const res = await exec();
      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property('qtdeAparicoes');
    });

    it('should return 400 if there is no planet with the given name', async () => {
      planeta.nome = 'Plutão';
      const res = await exec();
      expect(res.status).to.be.equal(400);
      expect(res.body.message).to.match(/encontrado/);
    });

    it('should return 400 if name is too generalist', async () => {
      planeta.nome = 'a';
      const res = await exec();
      expect(res.status).to.be.equal(400);
      expect(res.body.message).to.match(/específico/);
    });
  });
});
