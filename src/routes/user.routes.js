const express = require('express');
const userController = require('../controllers/user.controller');
const validId = require('../middleware/validateId');

const router = express.Router();

router.post('/', userController.postUser);

module.exports = router;
