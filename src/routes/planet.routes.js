const express = require('express');
const planetController = require('../controllers/planet.controller');

const router = express.Router();

router.post('/', planetController.post);
router.get('/', planetController.getAll);

module.exports = router;
