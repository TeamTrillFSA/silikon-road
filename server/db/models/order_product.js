const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order_product', {
  price: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = OrderProduct;
