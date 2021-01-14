const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', userController.profile);
router.post('/profile', userController.profile);
router.get('/edit_profile', userController.edit);
router.post('/edit_profile', userController.edit);


module.exports = router;