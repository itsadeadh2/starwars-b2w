const winston = require('winston');
const http = require('http');
const app = require('../src/app');
require('../src/startup/logger')();

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, () => {
  winston.info(`API running on port ${port}`);
});
