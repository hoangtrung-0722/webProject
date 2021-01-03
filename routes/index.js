const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const booksController = require('../controllers/bookController');

/* GET home page. */
router.get('/', indexController.index);
router.get('/index', indexController.index);

router.get('/products', booksController.products);

router.get('/products/detail/:id', booksController.detail);

module.exports = router;
