const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const booksController = require('../controllers/bookController');

//GET home page
router.get('/index', indexController.index);
//GET products page
router.get('/products', booksController.products);

//router.get('/:page', bookController.index);

router.get('/products/detail/:id', booksController.detail);

module.exports = router;