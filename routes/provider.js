

const router                  = require('express').Router();
const {
   Provider,
   Customer,
   OfferDatail,
   Offer
}                             = require('../models');
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next) => {
   res.render('providers/login', {
      err: "none"
   });
});

router.get('/signup', registerLoginMiddleware, (req, res, next) => {
   res.render('providers/signup');
});

router.post('/signup', registerLoginMiddleware, (req, res, next) => {
   Provider
      .create(req.body)
      .then(result => {
         res.redirect('/provider/login');
      })
      .catch((err) => {
         res.render('providers/signup', {
            err
         });

      });
});

router.post('/login', registerLoginMiddleware, (req, res, next) => {
   let email = req.body.email;
   let password = req.body.password;
   Provider
      .findEmailLogin(email)
      .then(user => {
         if (user.loginCheck(password)) {
            req.session.user = user;
            res.redirect('/provider/profile');
         } else {
            res.render('providers/login', {
               err: 'Wrong password!'
            });
         }
      })
      .catch(err => {
         res.render('customers/login-customer.ejs', {
            err: 'Email not registered!'
         });
      });
});

router.get('/logout', (req, res) => {
   delete req.session.user;
   res.redirect('/');
});

// router.get('/index', (req, res) => {
//   res.render('providers/index');
// });

router.get('/profile', (req, res) => {
   Provider
      .findById(req.session.user.id)
      .then(provider => {
         if (provider == null) {
            res.redirect('/');
         } else {
            res.render('providers/profile', {
               provider
            });
         }
      });
});

router.get('/profile/edit', (req, res) => {
   Provider
      .findById(req.session.user.id)
      .then(provider => {
         res.render('providers/edit', {
            provider
         });
      });
});

router.get('/profile/edit', (req, res) => {
   Provider
      .update(req.session.user)
      .then(provider => {
         res.render('providers/edit', {
            provider
         });
      });
});

router.post('/profile/edit', (req, res) => {
   let id = req.session.user.id;
   Provider
      .update({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         service: req.body.service,
         price: req.body.price
      }, {
         where: {
            id: id
         },
         individualHooks: true
      })
      .then(result => {
         //    req.session.user = result;
         res.redirect('/provider/profile');
      })
      .catch(err => {
         console.log(err);
      });
});

router.get('/profile/delete/', (req, res) => {
   Provider
      .destroy({
         where: {
            id: req.session.user.id
         }
      })
      .then(function(success) {
         delete req.session.user;
         res.redirect('/');
      });
});

router.get('/offer', (req, res) => {
   Provider
      .findById(req.session.user.id)
      .then(provider => {
         Customer.findAll()
            .then(customers => {
               res.render('providers/offer.ejs', {
                  provider,
                  customers
               });
            });
      });

});

module.exports = router;
