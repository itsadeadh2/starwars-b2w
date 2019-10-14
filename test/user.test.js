const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../src/models/user.model');

let server;

describe('/users', () => {
  beforeEach(async () => {
    server = require('../src/app');
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  let user;

  beforeEach(async () => {
    user = {
      email: 'lukinhoskydellaspvh@gmail.com',
      senha: 'hesnotmyfather',
    };
  });

  describe('POST', () => {
    const exec = async () => await request(server).post('/users').send(user);

    it('should return 200 and a valid user token if everything is ok', async () => {
      const res = await exec();
      expect(res.status).to.be.equals(201);
      expect(jwt.verify(res.body.token, config.get('jwtprivatekey'))).to.have.property('email');
    });

    it('should return 400 if the user already exists', async () => {
      await exec();
      const res = await exec();
      expect(res.status).to.be.equals(400);
      expect(res.body.message).to.match(/registrado/);
    });

    it('should return 400 if the user email is invalid', async () => {
      user.email = 'thisisnotanemail';
      const res = await exec();
      expect(res.status).to.be.equals(400);
      expect(res.body.message).to.match(/email/);
    });
  });
});
