const request = require('supertest');
const { expect } = require('chai');
const { Planet } = require('../src/models/planet.model');
const userRepo = require('../src/repository/user.repository');
const { User } = require('../src/models/user.model');

let server;

describe('/planets', () => {
  beforeEach(async () => {
    server = require('../bin/server');
  });
  afterEach(async () => {
    await Planet.deleteMany({});
    await User.deleteMany({});
    await server.close();
  });

  let planeta;
  let token;

  beforeEach(async () => {
    planeta = {
      nome: 'Alderaan',
      clima: 'Quente',
      terreno: 'Acidentado',
    };
    token = await userRepo.postUser({ email: 'fakemail@mail.com', senha: 'senha123' });
  });

  describe('POST', () => {
    const exec = async () => await request(server)
      .post('/planets')
      .set('x-auth-token', token)
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

  describe('GET ALL', () => {
    let planeta2;
    let queryParam;
    beforeEach(async () => {
      planeta2 = {
        nome: 'Yavin',
        clima: 'Quente',
        terreno: 'Acidentado',
      };
      await request(server).post('/planets').set('x-auth-token', token).send(planeta);
      await request(server).post('/planets').set('x-auth-token', token).send(planeta2);
    });

    const exec = async () => await request(server).get(`/planets?nome=${queryParam}`).set('x-auth-token', token).send();

    it('should return a list containing a specific planet', async () => {
      queryParam = 'alderaan';
      const res = await exec();
      expect(res.status).to.be.equal(200);
      expect(res.body[0].nome).to.be.equals('Alderaan');
    });

    it('should return a list with all the planets', async () => {
      queryParam = '';
      const res = await exec();
      expect(res.body.length).to.be.equals(2);
      expect(res.status).to.be.equals(200);
    });
  });

  describe('DELETE BY ID', () => {
    let planetId;
    beforeEach(async () => {
      planeta = await request(server).post('/planets').set('x-auth-token', token).send(planeta);
    });

    const exec = async () => await request(server).delete(`/planets/${planetId}`).set('x-auth-token', token).send();

    it('should delete the planet with the given id', async () => {
      planetId = planeta.body._id;
      const res = await exec();
      expect(res.status).to.be.equals(200);
      expect(res.body).to.have.property('nome');
    });

    it('should return a 400 if the id is invalid', async () => {
      planetId = 'itsatrap';
      const res = await exec();
      expect(res.status).to.be.equals(400);
      expect(res.body.message).to.match(/inválido/);
    });

    it('should return 404 if the planet doesnt exists', async () => {
      planetId = '5d9e651b5682de00d2f9bd50';
      const res = await exec();
      expect(res.status).to.be.equals(404);
      expect(res.body.message).to.match(/encontrado/);
    });
  });

  describe('GET BY ID', () => {
    let planetId;
    beforeEach(async () => {
      planeta = await request(server).post('/planets').set('x-auth-token', token).send(planeta);
    });

    const exec = async () => await request(server).get(`/planets/${planetId}`).set('x-auth-token', token).send();

    it('should return a planet by its id', async () => {
      planetId = planeta.body._id;
      const res = await exec();
      expect(res.status).to.be.equals(200);
      expect(res.body).to.have.property('nome');
    });

    it('should return a 400 if the id is invalid', async () => {
      planetId = 'itsatrap';
      const res = await exec();
      expect(res.status).to.be.equals(400);
      expect(res.body.message).to.match(/inválido/);
    });

    it('should return 404 if the planet doesnt exists', async () => {
      planetId = '5d9e651b5682de00d2f9bd50';
      const res = await exec();
      expect(res.status).to.be.equals(404);
      expect(res.body.message).to.match(/encontrado/);
    });
  });
});
