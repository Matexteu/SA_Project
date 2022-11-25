const express = require('express');
const authController = require('../controllers/authController');


router = express.Router();


router
    .post('/free', authController.authLogged) // RF AUTH 01
    .post('/admin', authController.authAdmin) // RF AUTH 02
    .post('/private/pages/free/:id', authController.authPrivatePage); // RF AUTH 03
module.exports = router;