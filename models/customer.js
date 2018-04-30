/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   var Customer = sequelize.define('Customer', {
      name: DataTypes.STRING,
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: {
               msg: 'Validation error: wrong email format!'
            }
         },
         unique: {
            msg: 'Validation error: email already exist!'
         }
      },
      password: DataTypes.STRING
   }, {});
   Customer.associate = function(models) {
      // associations can be defined here
      Customer.hasMany(models.Offer);
      Customer.belongsToMany(models.Provider, {
         through: models.Offer
      });
   };

   Customer.hook('beforeSave', (customer, options) => {
      let saltRounds = 10;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(customer.password, salt);
      customer.password = hash;
   });

  Customer.prototype.loginCheck = function(password) {
    if (bcrypt.compareSync(password, this.password)) {
       return true;
    } else {
       return false;
    }
 };

 Customer.findEmailLogin = (function(email) {
    return Customer.findOne({
       where: {
          email: email
       }
    });
 });

  return Customer;
};
