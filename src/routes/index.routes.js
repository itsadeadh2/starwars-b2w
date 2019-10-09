const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ name: 'Star Wars Planets API', description: 'API dos planetas de Star Wars para o teste da B2W.' });
});

module.exports = router;
