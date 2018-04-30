/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

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
