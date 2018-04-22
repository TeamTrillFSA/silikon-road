
const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'CART',
      'PROCESSING',
      'SHIPPED',
      'COMPLETE',
      'CANCELLED',
    ),
    defaultValue: 'CART',
  },
});

module.exports = Order;
