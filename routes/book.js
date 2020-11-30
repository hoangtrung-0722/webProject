const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.index);

router.get('/book_detail', bookController.detail);

module.exports = router;
