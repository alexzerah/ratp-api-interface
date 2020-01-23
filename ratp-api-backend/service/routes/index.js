var express = require('express');
var router = express.Router();
const User = require('../controllers/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', User.login)
      .post('/register', User.register)
      .put('/favorites', User.postFavorites)
      .get('/favorites', User.getFavorites)

module.exports = router;
