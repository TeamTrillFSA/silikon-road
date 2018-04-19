
const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^\d{5}$/
    }
  }
});

// Still needs instance methods such as .getTotalOrderValue()

module.exports = Address;
