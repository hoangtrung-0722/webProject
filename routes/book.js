const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const booksController = require('../controllers/bookController');

//GET home page
router.get('./', indexController.index);

//GET products page
router.get('/', booksController.products);

//router.get('/:page', bookController.index);

router.get('/detail/:id', booksController.detail);
router.post('/detail/:id', booksController.detail);

router.get('/shopping_cart', booksController.shopping_cart);

module.exports = router;