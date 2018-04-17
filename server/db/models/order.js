
const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'CANCELLED',
      'CART',
      'CHECKOUT_REVIEW',
      'CHECKOUT_PAYMENT',
      'COMPLETED'
    )
  },
  billingAddrName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingAddrStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingAddrCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingAddrState: {
    type: Sequelize.ENUM('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')
  },
  billingAddrZIP: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^\d{5}$/
    }
  },
  shippingAddrName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingAddrStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingAddrCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingAddrState: {
    type: Sequelize.ENUM('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY')
  },
  shippingAddrZIP: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^\d{5}$/
    }
  }
});

// Still needs instance methods such as .getTotalOrderValue()

module.exports = Order;
