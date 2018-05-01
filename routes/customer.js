

const router = require('express').Router();
const model = require('../models');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const op = sequelize.Op;
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next) => {
   res.render('customers/login', {
      err: 'none'
   });
});

router.get('/signup', registerLoginMiddleware, (req, res, next) => {
   res.render('customers/signup', {
      title: 'Customer Form'
   });
});

router.post('/signup', registerLoginMiddleware, (req, res, next) => {
   model.Customer.create(req.body)
      .then(customer => {
         res.redirect('/customer/login');
      })
      .catch(({
         errors
      }) => {
         res.render('customers/signup', {
            errors
         });
      });
});

router.post('/login', registerLoginMiddleware, (req, res, next) => {
   let email = req.body.email;
   let password = req.body.password;
   model.Customer.findEmailLogin(email)
      .then(user => {
         if (user.loginCheck(password)) {
            req.session.user = user;
            res.redirect('/customer/profile');
         } else {
            res.render('customers/login', {
               err: 'Wrong password!'
            });
         }
      })
      .catch(err => {
         res.render('customers/login', {
            err: 'Email not registered!'
         });
      });
});

router.get('/logout', (req, res) => {
   delete req.session.user;
   res.redirect('/');
});

router.get('/profile', (req, res, next) => {
   model.Customer.findById(req.session.user.id)
      .then(customer => {
         if (customer == null) {
            res.redirect('/');
         } else {
            res.render('customers/profile', {
               customer
            });
         }

      })
      .catch(err => {
         console.log(err);
      });
});

router.get('/profile/edit', (req, res) => {
   model.Customer.findById(req.session.user.id)
      .then(customer => {
         res.render('customers/edit', {
            customer
         });
      })
      .catch(err => {
         console.log(err);
      });
});

router.post('/profile/edit', (req, res) => {
   let id = req.session.user.id;
   model.Customer.update({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
      }, {
         where: {
            id: id
         },
         individualHooks: true
      })
      .then(result => {
         res.redirect('/customer/profile');
      })
      .catch(err => {
         console.log(err);
      });
});

router.get('/profile/delete', (req, res) => {
   model.Customer.destroy({
         where: {
            id: req.session.user.id
         }
      })
      .then(result => {
         delete req.session.user;
         res.redirect('/');
      })
      .catch(err => {
         console.log(err);
      });
});

router.get('/service', (req, res) => {
   model.Customer
      .findById(req.session.user.id)
      .then(customer => {
         model.Provider.findAll()
            .then(providers => {
               res.render('customers/service', {
                  providers,
                  customer
               });
            });
      });

});

router.post('/service', (req, res) => {
   let keys = req.body.search_type;
   let search = req.body.search;
   model.Provider.findAll({
         where: {
            [keys]: {
               [op.iLike]: '%' + search + '%'
            }
         }
      })
      .then((providers) => {
         res.render('customers/service', {
            providers
         });
      });

});


router.get('/service/buy/:id', (req, res) => {
   let providerId = req.params.id;
   model.Offer.create({
         CustomerId: req.session.user.id,
         ProviderId: providerId
      })
      .then(result => {
         model.OfferDatail.create({
            OfferId: result.id
         });

         res.render('customers/offer', {
            result: result
         });
      })
      .catch(err => {
         console.log(err);
      });
});

router.post('/service/buy/:id', (req, res) => {
   model.OfferDatail.update({
         customer_name: req.body.customerName,
         service_name: req.body.serviceName,
         description: req.body.description,
         bidding_price: req.body.biddingPrice,
         status: 'pending'
      }, {
         where: {
            id: 26
         }
      })
      .then(customer => {
         res.redirect('/customer/profile');
      })
      .catch(err => {
         console.log(err);
      });
});

module.exports = router;
