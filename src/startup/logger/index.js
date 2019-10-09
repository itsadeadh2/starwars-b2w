const winston = require('winston');
const config = require('config');

module.exports = () => {
  const fileLogger = new winston.transports.File({
    filename: 'logs/info\.log',
    level: 'info',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
    ),
  });

  const errorLogger = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
    ),
  });

  const consoleLogger = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
  });

  process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(fileLogger);
  winston.add(errorLogger);
  winston.add(consoleLogger);
};
