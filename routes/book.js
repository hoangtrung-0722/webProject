const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.index);

router.get('/books', bookController.index);

router.get('/:page', bookController.index);

router.get('/book_detail/:id', bookController.detail);

module.exports = router;