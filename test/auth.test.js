const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const { User } = require('../src/models/user.model');

let server;

describe('/auth', () => {
  beforeEach(async () => {
    server = require('../bin/server');
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  let user;

  beforeEach(async () => {
    user = {
      email: 'lukinhoskydellaspvh@gmail.com',
      senha: 'hesnotmyfather',
    };
    await request(server).post('/users').send(user);
  });

  describe('POST', () => {
    const exec = async () => await request(server).post('/auth').send(user);

    it('should return 200 and a valid user token if everything is ok', async () => {
      const res = await exec();
      expect(res.status).to.be.equals(200);
      expect(jwt.verify(res.body.token, process.env.JWTPRIVATEKEY)).to.have.property('email');
    });

    it('should return 400 if the email doesnt exists', async () => {
      user.email = 'lukinho@skywalker.com';
      const res = await exec();
      expect(res.status).to.be.equals(400);
    });

    it('should return 400 if the password is incorrect', async () => {
      user.senha = 'heismyfather';
      const res = await exec();
      expect(res.status).to.be.equals(400);
    });
  });
});
