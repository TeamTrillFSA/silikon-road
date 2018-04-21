
const Sequelize = require('sequelize');
const db = require('../db');
const OrderProduct = require('./order_product');

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
