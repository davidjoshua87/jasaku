
'use strict';

const {
   sequelize
} = require('../models');

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Offer', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         customer_name: {
            type: Sequelize.STRING
         },
         service_name: {
            type: Sequelize.STRING
         },
         description: {
            type: Sequelize.STRING
         },
         bidding_price: {
            type: Sequelize.INTEGER
         },
         Status: {
            type: Sequelize.STRING
         },
         CustomerId: {
            type: Sequelize.INTEGER
         },
         ProviderId: {
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
      return queryInterface.dropTable('OfferDatails');
   }
};
