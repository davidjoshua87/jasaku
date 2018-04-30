/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';

const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
   var Provider = sequelize.define('Provider', {
      name: DataTypes.STRING,
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: {
               args: true,
               msg: 'email invalid'
            }
         },
         unique: {
            msg: 'Validation error : email is already use'
         }
      },
      password: DataTypes.STRING,
      service: DataTypes.STRING,
      price: DataTypes.INTEGER
   }, {});
   Provider.associate = function(models) {
      // associations can be defined here
      Provider.hasMany(models.Offer);
      Provider.belongsToMany(models.Customer, {
         through: models.Offer
      });
   };

   Provider.hook('beforeSave', (provider, options) => {
      let saltRounds = 10;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(provider.password, salt);
      provider.password = hash;
   });

   Provider.prototype.loginCheck = function(password) {
      if (bcrypt.compareSync(password, this.password)) {
         return true;
      } else {
         return false;
      }
   };

   Provider.findEmailLogin = (function(email) {
      return Provider.findOne({
         where: {
            email: email
         }
      });
   });

   return Provider;
};
