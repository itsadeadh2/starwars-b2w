const express = require('express');
const planetController = require('../controllers/planet.controller');
const validId = require('../middleware/validateId');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, planetController.post);
router.get('/', auth, planetController.getAll);
router.get('/:id', [auth, validId], planetController.getById);
router.delete('/:id', [auth, validId], planetController.deleteById);

module.exports = router;
