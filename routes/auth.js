const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/users/login', authController.login);

module.exports = router;