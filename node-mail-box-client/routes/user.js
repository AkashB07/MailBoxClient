const express = require('express');
const authenticatemiddleware = require('../middleware/auth');

const userController = require('../controller/user')

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;