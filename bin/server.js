const winston = require('winston');
const config = require('config');
const http = require('http');
const app = require('../src/app');
require('../src/startup/logger')();

const port = config.get('port') || 3000;
const server = http.createServer(app).listen(port, () => {
  winston.info(`API running on port ${port}`);
});

module.exports = server;
