const request = require('supertest');
const { expect } = require('chai');

let server;

describe('/', () => {
  beforeEach(async () => {
    server = require('../src/app');
  });
  afterEach(async () => {
  });

  describe('GET', async () => {
    const exec = async () => await request(server)
      .get('/')
      .send();

    it('should return a json with the details of the api', async () => {
      const res = await exec();
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.status).to.be.equals(200);
    });
  });
});
