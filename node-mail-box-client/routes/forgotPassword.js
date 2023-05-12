const express = require('express');

const resetpasswordController = require('../controller/forgotPassword');

const router = express.Router();

router.get('/updatepassword/:uuid', resetpasswordController.updatepassword)

router.get('/resetpassword/:uuid', resetpasswordController.resetpassword)

router.post('/forgotpassword', resetpasswordController.forgotpassword)

module.exports = router;