const express = require('express');

const mailController = require('../controller/mail');
const userauthentication = require('../middleware/auth');


const router = express.Router();

router.post('/send', userauthentication.authenticate , mailController.sendMail);

router.get('/inbox', userauthentication.authenticate , mailController.getInbox);

router.get('/sent', userauthentication.authenticate , mailController.getSent);

router.patch('/updatemail', userauthentication.authenticate, mailController.updateMail);

router.delete('/deleteinbox/:mailId', userauthentication.authenticate, mailController.deleteInbox);

router.delete('/deletesent/:mailId', userauthentication.authenticate, mailController.deleteSent);


module.exports = router;