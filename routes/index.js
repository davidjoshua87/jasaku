

const authenticationMiddleware = require('../middlewares/authenticationMiddleware.js');
const router                   = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
   res.render('signup');
});

router.get('/profile', authenticationMiddleware, (req, res) => {
  res.render('profile');
});

router.get('/login', (req, res) => {
   res.render('login');
});

module.exports = router;
