const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order_product', {
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderProduct;
