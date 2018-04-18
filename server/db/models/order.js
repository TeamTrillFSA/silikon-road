
const Sequelize = require('sequelize');
const db = require('../db');
const OrderProduct = require('./order_product')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'CART',
      'PROCESSING',
      'SHIPPED',
      'COMPLETE',
      'CANCELLED'
    ),
    defaultValue: 'CART'
  },
});

Order.afterUpdate(order => {
  if (order.status === 'PROCESSING') {
    OrderProduct.findAll({
      where: {
        orderId: order.id
      }
    })
    // order.getProducts() // This works!
    //   .then( products => console.log(products) )
  }
})

module.exports = Order;
