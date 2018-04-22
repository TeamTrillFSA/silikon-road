/* eslint-disable new-cap */
const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.agecomputer.org/images/computerhappy.png',
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    set(value) {
      if (toString.call(value).slice(8, -1) === 'String') {
        const arrayOfTags = value.split(',').map(tag => tag.trim());
        this.setDataValue('tags', arrayOfTags);
      } else {
        this.setDataValue('tags', value);
      }
    },
    defaultValue: [],
  },
});

module.exports = Product;
