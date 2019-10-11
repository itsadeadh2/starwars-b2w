const jwt = require('jsonwebtoken');
const config = require('config');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ message: 'Acesso negado!' });

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    return next();
  } catch (ex) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
