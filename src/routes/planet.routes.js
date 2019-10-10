const express = require('express');
const planetController = require('../controllers/planet.controller');
const validId = require('../middleware/validateId');

const router = express.Router();

router.post('/', planetController.post);
router.get('/', planetController.getAll);
router.get('/:id', validId, planetController.getById);
router.delete('/:id', validId, planetController.deleteById);

module.exports = router;
