

'use strict';
const {
   sequelize
} = require('../models');

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Providers', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         name: {
            type: Sequelize.STRING
         },
         email: {
            type: Sequelize.STRING,
            unique: true
         },
         password: {
            type: Sequelize.STRING
         },
         service: {
            type: Sequelize.STRING
         },
         price: {
            type: Sequelize.INTEGER
         },
         createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
         },
         updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
         }
      }, {
         timestamps: true
      });
   },
   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Providers');
   }
};
